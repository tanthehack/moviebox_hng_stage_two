import * as Icon from '@heroicons/react/24/solid'
import { Button } from './button';
import { useState } from 'react';

const Paginate = ({ totalPosts, paginate, currentPage, totalPages }) => {
    const pageNumbers = [];
    const [activePage, setActivePage] = useState(1)

    for (let i = 1; i <= Math.ceil(totalPosts / 20); i++) {
        pageNumbers.push(i);
    }

    const goToNextPage = () => {
        setActivePage((val) => {
            if (val >= totalPages) return val;
            paginate(val + 1)

            return val + 1;
        });
    }

    const goToPreviousPage = () => {
        setActivePage((val) => {
            if (val <= 1) return val;
            paginate(val - 1)
            return val - 1;
        });
    }

    const selectPage = (number) => {
        paginate(number)
        setActivePage(number)
    }

    return (
        <div className="w-full flex justify-center">
            <Button
                icon={<Icon.ArrowLeftIcon />}
                iconOnly
                widthFit
                onClick={goToPreviousPage}
            />
            <ul className="flex items-center gap-6">
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        onClick={() => selectPage(number)}
                        className={`${number === activePage ? "border-b-[3px] border-rose-700" : ""} hover:text-white hover:bg-rose-700 py-[10px] px-[20px] hover:cursor-pointer rounded-lg`}
                    >
                        {number}
                    </li>
                ))}
            </ul>
            <Button
                icon={<Icon.ArrowRightIcon />}
                iconOnly
                widthFit
                onClick={goToNextPage}
            />
        </div>
    );
};

export default Paginate;