import { useEffect, useState } from "react"

const useDataGroupBy = (data: Array<any>, orderByKey: string) => {
    const [groupedData, setGroupedData] = useState<object>({})
    useEffect(() => {
        let tempGroupedData: any = {}
        if (data.length) {
            data.forEach(v => {
                const groupKeyValue = v[orderByKey];
                if (tempGroupedData[groupKeyValue]) {
                    tempGroupedData[groupKeyValue] = [...tempGroupedData[groupKeyValue], v]
                } else {
                    tempGroupedData[groupKeyValue] = [v]
                }
            })
        }
        setGroupedData(tempGroupedData)
    }, [orderByKey, data])

    return { groupedData }
}

export default useDataGroupBy;