import dayjs from 'dayjs';

function getRandomArray(num = 100): number {
  let resultNum = Number((Math.random() * num).toFixed(0));

  if (resultNum <= 1) {
    resultNum = 1;
  }

  return resultNum;
}
/** 首页 dashboard 折线图 */
export function constructInitDashboardDataset(type: string) {
  const dateArray: Array<string> = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const datasetAxis = {
    xAxis: {
      type: 'category',
      show: false,
      data: dateArray,
    },
    yAxis: {
      show: false,
      type: 'value',
    },
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  };

  if (type === 'line') {
    const lineDataset = {
      ...datasetAxis,
      color: ['#fff'],
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type,
          showSymbol: true,
          symbol: 'circle',
          symbolSize: 0,
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' },
            ],
          },
          itemStyle: {
            normal: {
              lineStyle: {
                width: 2,
              },
            },
          },
        },
      ],
    };
    return lineDataset;
  }
  if (type === 'bar') {
    const barDataset = {
      ...datasetAxis,
      //color: getChartListColor(),
      series: [
        {
          data: [
            100,
            130,
            184,
            218,
            {
              value: 135,
              itemStyle: {
                opacity: 0.2,
              },
            },
            {
              value: 118,
              itemStyle: {
                opacity: 0.2,
              },
            },
            {
              value: 60,
              itemStyle: {
                opacity: 0.2,
              },
            },
          ],
          type,
          barWidth: 9,
        },
      ],
    };
    return barDataset;
  }
}
export function getLineChartDataSet({
  dateTime = [],
  placeholderColor,
  borderColor,
}: { dateTime?: Array<string> } & Record<string, string>) {
  const divideNum = 10;
  const timeArray = [];
  const inArray = [];
  const outArray = [];
  for (let i = 0; i < divideNum; i++) {
    if (dateTime.length > 0) {
      const dateAbsTime: number = (new Date(dateTime[1]).getTime() - new Date(dateTime[0]).getTime()) / divideNum;
      const enhandTime: number = new Date(dateTime[0]).getTime() + dateAbsTime * i;
      timeArray.push(dayjs(enhandTime).format('MM-DD'));
    } else {
      timeArray.push(
        dayjs()
          .subtract(divideNum - i, 'day')
          .format('MM-DD'),
      );
    }

    inArray.push(getRandomArray().toString());
    outArray.push(getRandomArray().toString());
  }

  const dataSet = {
    //color: getChartListColor(),
    tooltip: {
      trigger: 'item',
    },
    grid: {
      left: '0',
      right: '20px',
      top: '5px',
      bottom: '36px',
      containLabel: true,
    },
    legend: {
      left: 'center',
      bottom: '0',
      orient: 'horizontal', // legend 横向布局。
      data: ['本月', '上月'],
      textStyle: {
        fontSize: 12,
        color: placeholderColor,
      },
    },
    xAxis: {
      type: 'category',
      data: timeArray,
      boundaryGap: false,
      axisLabel: {
        color: placeholderColor,
      },
      axisLine: {
        lineStyle: {
          width: 1,
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: placeholderColor,
      },
      splitLine: {
        lineStyle: {
          color: borderColor,
        },
      },
    },
    series: [
      {
        name: '本月',
        data: outArray,
        type: 'line',
        smooth: false,
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          normal: {
            borderColor,
            borderWidth: 1,
          },
        },
        areaStyle: {
          normal: {
            opacity: 0.1,
          },
        },
      },
      {
        name: '上月',
        data: inArray,
        type: 'line',
        smooth: false,
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          normal: {
            borderColor,
            borderWidth: 1,
          },
        },
      },
    ],
  };
  return dataSet;
}


export function getPieChartDataSet({
  radius = 42,
  textColor,
  placeholderColor,
  containerColor,
}: { radius: number } & Record<string, string>) {
  return {
    //color: "getChartListColor()",
    tooltip: {
      show: false,
      trigger: 'axis',
      position: null,
    },
    grid: {
      top: '0',
      right: '0',
    },
    legend: {
      selectedMode: false,
      itemWidth: 12,
      itemHeight: 4,
      textStyle: {
        fontSize: 12,
        color: placeholderColor,
      },
      left: 'center',
      bottom: '0',
      orient: 'horizontal', // legend 横向布局。
    },
    series: [
      {
        name: '销售渠道',
        type: 'pie',
        radius: ['48%', '60%'],
        avoidLabelOverlap: true,
        selectedMode: true,
        hoverAnimation: true,
        silent: true,
        itemStyle: {
          borderColor: containerColor,
          borderWidth: 1,
        },
        label: {
          show: true,
          position: 'center',
          formatter: ['{value|{d}%}', '{name|{b}渠道占比}'].join('\n'),
          rich: {
            value: {
              color: textColor,
              fontSize: 28,
              fontWeight: 'normal',
              lineHeight: 46,
            },
            name: {
              color: '#909399',
              fontSize: 12,
              lineHeight: 14,
            },
          },
        },
        emphasis: {
          label: {
            show: true,
            formatter: ['{value|{d}%}', '{name|{b}渠道占比}'].join('\n'),
            rich: {
              value: {
                color: textColor,
                fontSize: 28,
                fontWeight: 'normal',
                lineHeight: 46,
              },
              name: {
                color: '#909399',
                fontSize: 14,
                lineHeight: 14,
              },
            },
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: 1048,
            name: '线上',
          },
          { value: radius * 7, name: '门店' },
        ],
      },
    ],
  };
}
