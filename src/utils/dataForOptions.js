const salary = {
  times: [
    { value: 'perMonth', label: 'Mỗi tháng' },
    { value: 'perDay', label: 'Mỗi ngày' },
    { value: 'perWeek', label: 'Mỗi tuần' },
    { value: 'perYear', label: 'Mỗi năm' },
  ],
  types: [
    { value: 'range', label: 'Trong khoảng' },
    { value: 'startingAmount', label: 'Bắt đầu từ' },
    { value: 'maximunAmount', label: 'Tối đa' },
    { value: 'exactAmount', label: 'Chính xác' },
  ],
}

const jobDetail = {
  amountOfJob: [
    { value: '', label: 'Chọn số lượng' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
    { value: 999, label: 'Tôi liên tục tuyển dụng vị trí này' },
  ],

  amountOfWeek: [
    { value: '', label: 'Chọn Thời gian' },
    { value: '1 đến 3 ngày', label: '1 đến 3 ngày' },
    { value: '1 đến 2 tuần', label: '1 đến 2 tuần' },
    { value: '2 đến 4 tuần', label: '2 đến 4 tuần' },
    { value: '1 đến 3 ngày', label: '1 đến 3 ngày' },
    { value: 'trên 4 tuần', label: 'Trên 4 tuần' },
  ],
}

export { salary, jobDetail }
