import * as Icon from '@heroicons/react/24/solid'
import { Button } from './button';
import { useState } from 'react';

const Paginate = ({ totalCount, paginate, currentPage, totalPages, pageSize }) => {
    const pageNumbers = [];
    const [activePage, setActivePage] = useState(1)

    // Create page numbers
    for (let i = 1; i <= Math.ceil(totalCount / 20); i++) {
        pageNumbers.push(i);
    }

    const goToNextPage = () => {
        setActivePage((val) => {
            // If the current page is the last page, do nothing
            if (val >= totalPages) return val;

            //Pass current page to paginate function in parent component
            paginate(val + 1)

            // Increment the active page by 1
            return val + 1;
        });
    }


    const goToPreviousPage = () => {
        setActivePage((val) => {
            // If the current page is the last page, do nothing
            if (val <= 1) return val;

            //Pass current page to paginate function in parent component
            paginate(val - 1)

            // Decrement the active page by 1
            return val - 1;
        });
    }

    const selectPage = (number) => {
        //Pass current page to paginate function in parent component & and set active page
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