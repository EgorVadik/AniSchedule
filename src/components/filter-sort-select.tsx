import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { capitalize } from '@/lib/helper'
import { filterAtom, sortAtom } from '@/state/atoms'
import { Filter, Sort } from '@/types'
import { useAtom } from 'jotai'

type FilterSelect = {
    type: 'filter'
    placeholder: 'Filter'
    items: Filter[]
}

type SortSelect = {
    type: 'sort'
    placeholder: 'Sort'
    items: Sort[]
}

type FilterSortSelectProps = FilterSelect | SortSelect

export const FilterSortSelect = ({
    type,
    placeholder,
    items,
}: FilterSortSelectProps) => {
    const [, setFilter] = useAtom(filterAtom)
    const [, setSort] = useAtom(sortAtom)

    return (
        <Select
            onValueChange={(val) => {
                if (type === 'filter') {
                    setFilter(val as Filter)
                    return
                }

                setSort(val as Sort)
            }}
        >
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {items.map((item) => (
                    <SelectItem key={item} value={item}>
                        {capitalize(item)}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
