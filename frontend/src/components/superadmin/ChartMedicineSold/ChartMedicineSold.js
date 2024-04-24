import { Suspense } from "react";

import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend, Title);
Chart.defaults.plugins.tooltip.backgroundColor = "rgb(0, 0, 156)";
Chart.defaults.plugins.legend.position = "left";
Chart.defaults.plugins.legend.title.display = true;
Chart.defaults.plugins.legend.title.text = "";
Chart.defaults.plugins.legend.title.font = "Helvetica Neue";

export default function ChartMedicineSold() {
  const data = {
    labels: ["Paracetamol", "Vitamin Tablets", "Antacid Tablets", "Others"],
    datasets: [
      {
        data: [55, 25, 12, 8],
        backgroundColor: ["#3497F9", "#A156FF", "#4EE578", "#FFEE55"],
        borderWidth: 2,
        radius: "60%",
      },
    ],
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Suspense fallback={<>...</>}>
      <div className='flex flex-col'>
        <div className='flex justify-between items-center'>
          <h2>Top Medicines Sold</h2>
          <FormControl variant='standard' sx={{ m: 0, minWidth: 120 }}>
            <InputLabel id='demo-simple-select-standard-label'>
              Weekly
            </InputLabel>
            <Select
              labelId='demo-simple-select-standard-label'
              id='demo-simple-select-standard'
              value={age}
              onChange={handleChange}
              label='Age'>
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Doughnut data={data} />
      </div>
    </Suspense>
  );
}
