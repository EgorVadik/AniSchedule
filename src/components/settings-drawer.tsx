'use client'

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import { Switch } from '@/components/ui/switch'
import { buttonVariants } from './ui/button'
import { Settings } from 'lucide-react'
import { useAtom } from 'jotai'
import { settingsAtom } from '@/state/atoms'
import { storeSettings } from '@/lib/helper'
import { FilterSortSelect } from './filter-sort-select'

export const SettingsDrawer = () => {
    const [settings, setSettings] = useAtom(settingsAtom)

    return (
        <Drawer>
            <DrawerTrigger
                className={buttonVariants({
                    variant: 'outline',
                    size: 'icon',
                })}
            >
                <Settings />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Settings</DrawerTitle>
                </DrawerHeader>
                <div className='px-4 py-2'>
                    <div className='flex gap-5'>
                        <span>Title:</span>
                        <span>Japanese</span>
                        <Switch
                            onCheckedChange={() => {
                                setSettings({
                                    ...settings,
                                    japanese: !settings.japanese,
                                })

                                storeSettings({
                                    japanese: !settings.japanese,
                                })
                            }}
                            checked={!settings.japanese}
                        />
                        <span>English</span>
                    </div>

                    <div className='space-y-6 pb-10 pt-6'>
                        <FilterSortSelect
                            type='filter'
                            placeholder='Filter'
                            items={[
                                'none',
                                'sun',
                                'mon',
                                'tue',
                                'wed',
                                'thu',
                                'fri',
                                'sat',
                            ]}
                        />
                        <FilterSortSelect
                            type='sort'
                            placeholder='Sort'
                            items={['none', 'date', 'title', 'rating']}
                        />
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
