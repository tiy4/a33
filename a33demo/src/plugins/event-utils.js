let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

// 初始化数据
export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'nihao',
    start: '2023-04-10T12:00:00+08:00',
    end: '2023-04-10T12:00:00+23:00',
    allDay: false
  },
  {
    // 创建事件
    id: createEventId(),
    // 事件
    title: 'Timed event',
    // 开始时间
    start: todayStr + 'T12:00:00',
    // 结束时间
    end: '2023-04-1T12:00:00+23:00',
    // 是否全天事件
    allDay: true
  }
]

// 创建事件
export function createEventId() {
  return String(eventGuid++)
}
