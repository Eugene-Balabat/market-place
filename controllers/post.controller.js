const User = require('../models/User')
const Item = require('../models/Item')
const Chapter = require('../models/Chapter')
const Order = require('../models/Order')
const jwt = require('jsonwebtoken')
const config = require('../config/default.json')

class PostController {
  async updateUserData(req, res) {
    try {
      const { username, surname, index, city } = req.body
      const { token } = req.headers
      const decodedToken = await jwt.verify(token, config.jwtKey)

      const user = await User.findOne({ _id: decodedToken.userId })

      if (!user)
        return res.status(400).json({
          error: {
            msg: 'Ошибка во время выполнения запроса: Пользователь не найден.'
          }
        })

      const result = await user.updateOne({ username, surname, index, city })

      if (!result.modifiedCount)
        return res.status(400).json({
          error: {
            msg: 'Ошибка во время выполнения запроса: Данные не обновлены.'
          }
        })
      const updatedUser = await User.findOne({ _id: decodedToken.userId })

      if (!updatedUser)
        return res.status(400).json({
          error: {
            msg: 'Ошибка во время выполнения запроса: Пользователь не найден.'
          }
        })

      res.status(200).json({
        user: {
          username: updatedUser.username,
          surname: updatedUser.surname,
          city: updatedUser.city,
          index: updatedUser.index
        },
        msg: 'Данные успешно обновлены'
      })
    } catch (e) {
      if (e.name === 'TokenExpiredError')
        return res.status(500).json({
          error: { msg: 'Жизненный цикл токена истек.', type: e.name }
        })
      else if (e.name === 'JsonWebTokenError')
        return res.status(500).json({
          error: { msg: 'Недействительный токен.', type: e.name }
        })
      else
        return res.status(500).json({
          error: { msg: 'Ошибка сервера: ' + e.message }
        })
    }
  }
  async addNewOrder(req, res) {
    try {
      const { idProduct } = req.body

      const { token } = req.headers
      const decodedToken = await jwt.verify(token, config.jwtKey)

      const user = await User.findOne({ _id: decodedToken.userId })

      if (!user)
        return res.status(400).json({
          error: {
            msg: 'Ошибка во время выполнения запроса: Пользователь не найден.'
          }
        })

      const candidat = await Order.findOne({ user: user._id, item: idProduct })
      if (candidat)
        return res.status(400).json({
          error: {
            msg: 'Ошибка во время выполнения запроса: Заказ уже добавлен.'
          }
        })

      const order = await new Order({ user: user._id, item: idProduct })
      if (!order)
        return res.status(400).json({
          error: {
            msg: 'Ошибка во время выполнения запроса: Данные не были добавлены.'
          }
        })
      order.save()

      res.status(200).json({
        msg: 'Данные успешно обновлены'
      })
    } catch (e) {
      if (e.name === 'TokenExpiredError')
        return res.status(500).json({
          error: { msg: 'Жизненный цикл токена истек.', type: e.name }
        })
      else if (e.name === 'JsonWebTokenError')
        return res.status(500).json({
          error: { msg: 'Недействительный токен.', type: e.name }
        })
      else
        return res.status(500).json({
          error: { msg: 'Ошибка сервера: ' + e.message }
        })
    }
  }
  async deleteOrder(req, res) {
    try {
      const { id_order } = req.body

      const { token } = req.headers
      const decodedToken = await jwt.verify(token, config.jwtKey)

      const user = await User.findOne({ _id: decodedToken.userId })

      const result = await Order.deleteOne({
        item: id_order,
        user: decodedToken.userId
      })

      res.status(200).json({
        msg: 'Данные были удалены'
      })
    } catch (e) {
      if (e.name === 'TokenExpiredError')
        return res.status(500).json({
          error: { msg: 'Жизненный цикл токена истек.', type: e.name }
        })
      else if (e.name === 'JsonWebTokenError')
        return res.status(500).json({
          error: { msg: 'Недействительный токен.', type: e.name }
        })
      else
        return res.status(500).json({
          error: { msg: 'Ошибка сервера: ' + e.message }
        })
    }
  }
}

module.exports = new PostController()

// const item = new Item({
//   title: 'DDR2, 1 ГБx1 шт, 800 МГц, PC6400, 6-6-6',
//   description:
//     'Оперативная память J Ram [JAL1G800D2] типа DDR2 гарантирует увеличенную рабочую частоту при снижении энергопотребления и тепловыделения. Данный модуль предназначается для оснащения офисной техники, но его мощности недостаточно для геймерского компьютера.',
//   inStock: true,
//   chapter: '61a603a02fcb52ff85d7b014'
// })
// const item2 = new Item({
//   title: 'DDR3, 2 ГБx1 шт, 1600 МГц, PC12800, 11-11-11-28 ',
//   description:
//     'Благодаря оперативной памяти AMD Radeon R5 Entertainment Series [R532G1601U1S-U] вы сможете увеличить производительность вашего компьютера, произведя его апгрейд. Представленная модель относится к формату DDR3 и идеально подходит для домашних компьютерных систем. Модуль памяти обладает хорошими техническими характеристиками, благодаря чему операционной системе покорится широкий спектр задач. Любые запросы пользователя будут выполняться компьютером быстро и эффективно. Объем представленного модуля ОЗУ равняется 2 ГБ.',
//   inStock: true,
//   chapter: '61a603a02fcb52ff85d7b014'
// })
// const item3 = new Item({
//   title: 'DDR2, 2 ГБx1 шт, 800 МГц, PC6400, 6-6-6-18',
//   description:
//     '2-гигабайтная оперативная память Patriot Signature [PSD22G80026] применяется в офисных рабочих станциях и домашних компьютерах, использующих память, относящуюся к типу DDR2. Модуль памяти отличается высокой степенью надежности, и может использоваться в системах, работающих с нагрузкой выше средней. Устройство подойдет для использования как в качестве единственного модуля памяти, так и для применения в комбинации с аналогичными модулями.',
//   inStock: false,
//   chapter: '61a603a02fcb52ff85d7b014'
// })
// const item1 = new Item({
//   title:
//     'AM4, 2 x 3400 МГц, L2 - 1 МБ, 2хDDR4-2400 МГц, Radeon R5, TDP 65 Вт',
//   description:
//     'Процессор AMD A6-9400 OEM представляет собой производительное решение начальной серии, которое может стать отличной основой для базовых офисных и домашних систем. В основе данной модели используется архитектура Bristol Ridge и техпроцесс 28 нм, благодаря чему процессор отличается высокой технологичностью. Для монтажа на материнскую плату используется сокет AM4.',
//   inStock: false
// })
// const item2 = new Item({
//   title:
//     'LGA 1200, 2 x 3500 МГц, L2 - 512 КБ, L3 - 4 МБ, 2хDDR4-2666 МГц, Intel UHD Graphics 610, TDP 58 Вт ',
//   description:
//     'Процессор Intel Celeron G5905 OEM представляет собой решение начального уровня, которое станет отличным выбором для домашних и офисных компьютеров. Данная модель выполнена на основе архитектуры Comet Lake-S и использует техпроцесс 14 нм. Установка на материнские платы производится при помощи сокета LGA 1200.Процессор Intel Celeron G5905 OEM использует в работе 2 ядра и 2 виртуальных потока. Рабочая частота фиксирована и составляет 3500 МГц. Встроенная графическая система представлена чипом Intel UHD Graphics 610, что позволит комфортно взаимодействовать как с офисными приложениями, так и с играми начального уровня. Максимальный объем оперативной памяти, поддерживаемый процессором, может достигать 128 ГБ типа DDR4. Встроенный контроллер PCI-E в данной модели соответствует версии 3.0.',
//   inStock: true
// })

// const item = new Chapter({
//   title: 'Процессоры',
//   listItems: [
//     '61a6011daf0a3f565456e1f4',
//     '61a6011daf0a3f565456e1f6',
//     '61a6011daf0a3f565456e1f5'
//   ]
// })
// const item2 = new Chapter({
//   title: 'Материнские платы'
// })
// const item3 = new Chapter({
//   title: 'Жесткие диски'
// })
// const item4 = new Chapter({
//   title: 'Оперативная память'
// })
// const item5 = new Chapter({
//   title: 'SSD-накопители'
// })

// item.save()
// item2.save()
// item3.save()
// item4.save()
// item5.save()
