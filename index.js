// Your code here

function createEmployeeRecord(data) {
  return {
    firstName: data[0],
    familyName: data[1],
    title: data[2],
    payPerHour: data[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}
function createEmployeeRecords(records) {
  return records.map(createEmployeeRecord)
}

function createTimeInEvent(record, dateStamp) {
  const [date, hour] = dateStamp.split(' ')
  record.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour),
    date
  })
  return record
}

function createTimeOutEvent(record, dateStamp) {
  const [date, hour] = dateStamp.split(' ')
  record.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(hour),
    date
  })
  return record
}

function hoursWorkedOnDate(record, date) {
  const timeIn = record.timeInEvents.find(event => event.date === date)
  const timeOut = record.timeOutEvents.find(event => event.date === date)
  const hoursWorked = (timeOut.hour - timeIn.hour) / 100
  return hoursWorked
}

function wagesEarnedOnDate(record, date) {
  const hoursWorked = hoursWorkedOnDate(record, date)
  const wagesEarned = hoursWorked * record.payPerHour
  return wagesEarned
}

function allWagesFor(record) {
  const datesWorked = record.timeInEvents.map(event => event.date)
  const wagesEarned = datesWorked.reduce((totalWages, date) => {
    return totalWages + wagesEarnedOnDate(record, date)
  }, 0)
  return wagesEarned
}
function calculatePayroll(records) {
  const payroll = records.reduce((totalPayroll, record) => {
    return totalPayroll + allWagesFor(record)
  }, 0)
  return payroll
}
