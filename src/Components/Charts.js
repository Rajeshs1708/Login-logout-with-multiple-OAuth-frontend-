import React from 'react';
import './Charts.css';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Radar, PolarRadiusAxis, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts'

const Charts = () => {

  const data = [
    { name: "Taj Mahal", value: 20 },
    { name: "Great Wall of China", value: 15 },
    { name: "Egyptian pyramids", value: 15 },
    { name: "Byzantine Church (Petra)", value: 15 },
    { name: "Machu Picchu", value: 15 },
    { name: "Kukulkan (Chichen Itza)", value: 10 },
    { name: "Parthenon", value: 10 }
  ]

  const data1 = [
    {
      subject: 'Taj Mahal',
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: 'Great Wall of China',
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'Egyptian pyramids',
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'Byzantine Church (Petra)',
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: 'Machu Picchu',
      A: 85,
      B: 90,
      fullMark: 150,
    },
    {
      subject: 'Chichen Itza',
      A: 100,
      B: 100,
      fullMark: 150,
    },
    {
      subject: 'Parthenon',
      A: 105,
      B: 125,
      fullMark: 150,
    },
  ];
  return (
    <>
      <div className='col-md-6 charts'>
        <PieChart className='pie' width={400} height={300}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </div>

      <div className='col-md-6 charts'>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data1}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default Charts
