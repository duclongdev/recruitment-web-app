import { Card } from 'antd'
import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import AnimatedNumbers from 'react-animated-numbers'
import { useSelector } from 'react-redux'
import { JobAPI } from '../../../api/job'

const DashboardAdminPage = () => {
  const employee = useSelector((state) => state.employee.list)
  const user = useSelector((state) => state.user.list)

  const [data, setData] = useState([])
  useEffect(() => {
    JobAPI.getAllJobs().then((res) => {
      setData(res.data)
      console.log(res.data)
    })
  }, [setData])

  const series = [employee.length, user.length]
  const options = {
    labels: ['người dùng', 'nhân viên'],
    chart: {
      width: 380,
      type: 'donut',
    },
    dataLabels: {
      enabled: true,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    legend: {
      position: 'right',
      offsetY: 0,
      height: 230,
    },
  }

  const series2 = [
    {
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
    {
      name: 'Free Cash Flow',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
  ]
  const options2 = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    yaxis: {
      title: {
        text: '$ (thousands)',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return '$ ' + val + ' thousands'
        },
      },
    },
  }

  return (
    <div id="chart">
      <h1 style={{ marginBottom: '20px' }}>Thống kê</h1>
      <div
        style={{
          display: 'flex',

          flexWrap: 'wrap',
          gap: '10px',
          height: '300px',
          overflow: 'auto',
        }}
      >
        <Card style={{ width: '49%', display: 'flex', justifyContent: 'center' }}>
          <ReactApexChart options={options} series={series} type="donut" width={400} />
        </Card>
        <Card
          style={{
            width: '24%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2>Tổng số công việc: </h2>
          <AnimatedNumbers
            includeComma
            animateToNumber={data.length}
            fontStyle={{ fontSize: 40 }}
            configs={[
              { mass: 1, tension: 140, friction: 126 },
              { mass: 1, tension: 130, friction: 114 },
              { mass: 1, tension: 150, friction: 112 },
              { mass: 1, tension: 130, friction: 120 },
            ]}
          ></AnimatedNumbers>
        </Card>
        <Card
          style={{
            width: '24%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2>Tổng số tài khoản: </h2>
          <AnimatedNumbers
            includeComma
            animateToNumber={employee.length + user.length}
            fontStyle={{ fontSize: 40 }}
            configs={[
              { mass: 1, tension: 30, friction: 10 },
              { mass: 2, tension: 40, friction: 10 },
              { mass: 3, tension: 30, friction: 10 },
            ]}
          ></AnimatedNumbers>
        </Card>
      </div>
    </div>
  )
}

export default DashboardAdminPage
