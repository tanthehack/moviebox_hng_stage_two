import * as Icon from '@heroicons/react/24/solid'
import { Button } from './button';
import { useState } from 'react';

const Paginate = ({ totalCount, paginate, currentPage, totalPages, pageSize }) => {
    const pageNumbers = [];
    const [activePage, setActivePage] = useState(1)

    // Create an array of page numbers based on total count and page size
    for (let i = 1; i <= Math.ceil(totalCount / pageSize); i++) {
        pageNumbers.push(i);
    }

    // Function to go to the next page
    const goToNextPage = () => {
        setActivePage((val) => {
            // If the current page is the last page, do nothing
            if (val >= totalPages) return val;

            // Pass the current page to the paginate function in the parent component
            paginate(val + 1)

            // Increment the active page by 1
            return val + 1;
        });
    }

    // Function to go to the previous page
    const goToPreviousPage = () => {
        setActivePage((val) => {
            // If the current page is the first page, do nothing
            if (val <= 1) return val;

            // Pass the current page to the paginate function in the parent component
            paginate(val - 1)

            // Decrement the active page by 1
            return val - 1;
        });
    }

    // Function to select a specific page
    const selectPage = (number) => {
        // Pass the selected page number to the paginate function in the parent component
        paginate(number)

        // Set the active page to the selected page
        setActivePage(number)
    }

    return (
        <div className="w-full flex justify-center">
            {/* Previous button */}
            <Button
                icon={<Icon.ArrowLeftIcon />}
                iconOnly
                widthFit
                onClick={goToPreviousPage}
            />
            {/* Page numbers */}
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
            {/* Next button */}
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