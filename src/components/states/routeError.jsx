import errorImg from '../../assets/error.svg'
import { useNavigate, useRouteError } from "react-router-dom";
import * as Icon from '@heroicons/react/24/solid'
import { Button } from '../global/button';

export const ErrorState = () => {
    const error = useRouteError();
    const navigate = useNavigate()
    return (
        <section className='lg:h-[100dvh]'>
            <div className="p-[30px] flex items-center gap-2">
                <Button
                    icon={<Icon.ChevronLeftIcon />}
                    iconOnly
                    widthFit
                    onClick={() => navigate(-1, { replace: true })}
                />
                <h1 className="lg:text-2xl text-xl font-bold">Go Back</h1>
            </div>
            <div className="flex flex-col items-center justify-center text-xl">
                <img src={errorImg} className='w-[200px] lg:w-[300px]' />
                <span className="text-3xl font-bold">Oops!</span>
                <p className=''>Seems like we've encountered a problem</p>
                <p className='font-bold'>{error?.status}: {error?.message || error?.statusText}</p>
            </div>
        </section>
    )
}