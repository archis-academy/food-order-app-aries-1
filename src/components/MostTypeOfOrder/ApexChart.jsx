import React from "react";
import ReactApexChart from "react-apexcharts";
import "./ApexChart.scss";

function ApexChart({ orderTypes }) {
  const { dineIn, toGo, delivery } = orderTypes;

  const series = [delivery, toGo, dineIn];
  const totalOrders = dineIn + toGo + delivery;
  const options = {
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "45%",
        },

        track: {
          background: "#393c49",
          margin: 3,
        },
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
            color: "#fff",

            formatter: function () {
              return totalOrders;
            },
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Delivery", "To Go", "Dine In", ""],
    colors: ["#65B0F6", "#FFB572", "#FF7CA3", ""],
  };

  return (
    <div className="chart-container">
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="radialBar"
          width={220}
          height={220}
        />
      </div>
      <div className="chart-details" id="html-dist">
        <div className="info-box">
          <div className="dine-in-color rounded-color "></div>
          <div className="info">
            <p className="info-title">Dine In</p>
            <p className="customer-info">{dineIn} customers</p>
          </div>
        </div>
        <div className="info-box">
          <div className="to-go-color rounded-color"></div>
          <div className="info">
            <p className="info-title">To Go</p>
            <p className="customer-info">{toGo} customers</p>
          </div>
        </div>

        <div className="info-box">
          <div className="delivery-color rounded-color"></div>
          <div className="info">
            <p className="info-title">Delivery</p>
            <p className="customer-info">{delivery} customers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApexChart;
