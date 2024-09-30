import React, { useRef } from "react";
import { Flex, useDimensions } from "@chakra-ui/react"
import PieChart from "../../../components/charts/pie"

interface FruitsChartOptions {
    jarItemsList: Array<any>;
};

const FruitsChart: React.FC<FruitsChartOptions> = ({
    jarItemsList
}) => {
    const elementRef: any = useRef();
    const dimensions = useDimensions(elementRef, true);
    return (
        <Flex ref={elementRef} minWidth='max-content' alignItems='center' justifyContent='center'>
            {jarItemsList.length ?
                <PieChart
                    width={(dimensions?.contentBox?.width || 0) * .8}
                    height={(dimensions?.contentBox?.width || 0) * .5}
                    data={jarItemsList.map(v => ({ name: v.name, value: v.totalCalories }))}
                /> : null}
        </Flex>
    )
};

export default FruitsChart;