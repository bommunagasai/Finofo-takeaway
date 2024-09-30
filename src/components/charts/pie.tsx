import { useMemo, useRef } from "react";
import * as d3 from "d3";
import styles from "./pie.css";

type DataItem = {
  name: string;
  value: number;
};
type PieChartProps = {
  width: number;
  height: number;
  data: DataItem[];
};

const MARGIN_X = 150;
const MARGIN_Y = 50;
const INFLEXION_PADDING = 20; // space between donut and label inflexion point

const colors = [
  "#FFC5B8", "#F7D2C4", "#E6DAC3", "#87CEEB", "#F2F2F2",
  "#FFD700", "#C9E4CA", "#BCE3C5", "#E4E4E4", "#FFC0CB",
  "#C6F2F5", "#F0E4CC", "#B2E6CE", "#E7DAC1", "#FFA07A",
  "#F7F4F8", "#E9D8B7", "#C4C3CF", "#87A6AC", "#F5F5DC",
  "#FFB0C6", "#E4E2F2", "#A9B7BD", "#7FA8E1", "#C0C2CE",
  "#EFEFFF", "#D4E8EA", "#93C7CA", "#66CCCC", "#CCCCCC",
  "#999999", "#666666", "#33CC33", "#FF99CC", "#FFAACC",
  "#F5B6BA", "#C0C9CE", "#87CEEB", "#F2F2F2", "#FFC5B8",
  "#E4E2F2", "#B2E6CE", "#7FA8E1", "#66CCCC", "#CCCCCC",
  "#999999", "#666666", "#33CC33"
];

const PieChart = ({ width, height, data }: PieChartProps) => {
  const ref = useRef(null);

  const radius = Math.min(width - 2 * MARGIN_X, height - 2 * MARGIN_Y) / 2;

  const pie = useMemo(() => {
    const pieGenerator = d3.pie<any, DataItem>().value((d) => d.value);
    return pieGenerator(data);
  }, [data]);

  const arcGenerator = d3.arc();

  const shapes = pie.map((grp: any, i: any) => {
    // First arc is for the Pie
    const sliceInfo = {
      innerRadius: 0,
      outerRadius: radius,
      startAngle: grp.startAngle,
      endAngle: grp.endAngle,
    };
    const centroid = arcGenerator.centroid(sliceInfo);
    const slicePath = arcGenerator(sliceInfo);

    // Second arc is for the legend inflexion point
    const inflexionInfo = {
      innerRadius: radius + INFLEXION_PADDING,
      outerRadius: radius + INFLEXION_PADDING,
      startAngle: grp.startAngle,
      endAngle: grp.endAngle,
    };
    const inflexionPoint = arcGenerator.centroid(inflexionInfo);

    const isRightLabel = inflexionPoint[0] > 0;
    const labelPosX = inflexionPoint[0] + 50 * (isRightLabel ? 1 : -1);
    const textAnchor = isRightLabel ? "start" : "end";
    const label = grp.data.name + " (" + grp.value + ")";

    return (
      <g
        key={i}
        className={styles.slice}
        onMouseEnter={() => {
          if (ref.current) {
            ref.current.classList.add(styles.hasHighlight);
          }
        }}
        onMouseLeave={() => {
          if (ref.current) {
            ref.current.classList.remove(styles.hasHighlight);
          }
        }}
      >
        <path d={slicePath} fill={colors[i]} />
        <circle cx={centroid[0]} cy={centroid[1]} r={2} />
        <line
          x1={centroid[0]}
          y1={centroid[1]}
          x2={inflexionPoint[0]}
          y2={inflexionPoint[1]}
          stroke={"black"}
          fill={"black"}
        />
        <line
          x1={inflexionPoint[0]}
          y1={inflexionPoint[1]}
          x2={labelPosX}
          y2={inflexionPoint[1]}
          stroke={"black"}
          fill={"black"}
        />
        <text
          x={labelPosX + (isRightLabel ? 2 : -2)}
          y={inflexionPoint[1]}
          textAnchor={textAnchor}
          dominantBaseline="middle"
          fontSize={14}
        >
          {label}
        </text>
      </g>
    );
  });

  return (
    <svg width={width} height={height} style={{ display: "inline-block" }}>
      <g
        transform={`translate(${width / 2}, ${height / 2})`}
        className={styles.container}
        ref={ref}
      >
        {shapes}
      </g>
    </svg>
  );
};

export default PieChart;