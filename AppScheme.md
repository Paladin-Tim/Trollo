Области хранения данных:
- База данных (пока на JSON-server)
- BFF
- Redux store

Сущности приложения:
- Пользователь:
    1. БД (список всех пользователей)
    2. BFF (сессия текущего пользователя)
    3. Стор (отображение в браузере)
- Роль пользователя:
    1. БД (список ролей)
    2. BFF (сессия текущего пользователя с ролью)
    3. Стор (использование на клиенте)
- Заявка:
    1. БД (список всех заявок)
    2. Стор (отображение в браузере со статусом, приоритетом, временем и комментариями)
- Статус заявки:
    1. БД (список всех статусов)
    2. Стор (отображение в браузере)
- Комментарий к заявке:
    1. БД (список всех комментариев к каждой заявке)
    2. Стор (отображение в браузере)
- Приоритет:
    1. БД (список всех приоритетов)
    2. Стор (отображение в браузере)

Таблицы БД:
- пользователи - users: id / login / password / registred_at / role_id
- роли - roles: id / name
- заявки -  bids: id / title / content / author_id / published_at / status_id / priority_id / implementer_id / comments[]: id / content / bid_id / author_id / published_at
- статусы заявок - statuses: id / name
- приоритеты - priorities: id / name

Схема состояния на BFF:
- сессия текущего пользователя: login / password / role

Схема для Redux store (на клиетне):
- user: id / login / roleId
- bids: bid[]: id / title / statusId / priorityId / implementerId
- bid: id / title / content / publishedAt / statusId / priorityId / implementerId / timeElapsed / comments[]: id / content / author / publishedAt
- users[]: id / login / registredAt / role