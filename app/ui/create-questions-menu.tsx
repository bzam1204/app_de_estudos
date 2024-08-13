import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { questionTypesLabels } from '../lib/questionTypesLabels'
import { DocumentPlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ReactElement } from 'react'
import { LucideProps } from 'lucide-react'

const callsToAction: Object[] = [
    //   { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    //   { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

export default function NavItem({ Icon, label }: { Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>, label: string }) {
    const lang = 'portuguese'
    const pathname = usePathname()
    const questionTypePath = pathname.split("/")
    return (
        <Popover className="relative">
            <PopoverButton className={clsx("flex gap-2 transition-all  transition-delay-500  rounded font-bold active:outline-none text-gray-800 hover:text-amber-500 px-2 py-1", {
                'bg-gray-400  hover:text-white hover:bg-amber-500    text-white': pathname.includes('/dashboard/questions/create'),
            })}>
                <Icon width={20} />
                {label}
                {/* {pathname.includes('create') && <span className="">{questionTypePath[questionTypePath.length - 1]}</span>} */}
            </PopoverButton>

            <PopoverPanel
                transition
                className="absolute left-1/2 z-10 mt-5 flex w-screen  max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in justify-center"
            >
                <div className="w-screen max-w-fit flex-auto overflow-hidden rounded bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-2 grid grid-cols-2 ">
                        {questionTypesLabels.map((item) => (
                            <div key={item.label[lang]} className="group relative flex gap-x-2 rounded-lg p-2 hover:bg-amber-50">
                                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white hover:text-amber-500">
                                    <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-amber-500" />
                                </div>
                                <div>
                                    <Link href={`/dashboard/questions/create/${item.href}`} className="font-semibold text-gray-800">
                                        {item.label[lang]}
                                        <span className="absolute inset-0" />
                                    </Link>
                                    <p className="mt-1 text-gray-600">{item.description[lang]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                        {callsToAction.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                            >
                                <item.icon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                                {item.name}
                            </a>
                        ))}
                    </div> */}
                </div>
            </PopoverPanel>
        </Popover>
    )
}
