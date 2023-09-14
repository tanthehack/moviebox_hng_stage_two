import * as Icon from '@heroicons/react/24/solid'

export const ErrorState = ({ subText, icon }) => {
    return (
        <section className="flex flex-col items-center justify-center gap-3 py-32">
            <Icon.ExclamationCircleIcon className="w-[100px] h-[100px] text-gray-400" />
            <h1 className="text-gray-400 text-2xl">Oops! Something went wrong</h1>
            <p className="text-gray-400 text-lg">{subText}</p>
        </section>
    )
}