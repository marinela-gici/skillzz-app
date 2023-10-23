import React from 'react';

const Pagination = ({page, setPage, setCurrentPage, links}) => {

    const getClassName = (active, index) => {
        let classes = 'cursor-pointer px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white';
        classes += index === 0 ? ' rounded-l-lg' : (index === links.length - 1 ? ' rounded-r-lg' : '');

        if (active) {
            classes += `${classes} bg-gray-100 dark:bg-gray-500`;
        }

        return classes;
    }

    const updatePage = (link) => {
        setCurrentPage(link.url);
        setPage(link.number);
    }

    return (
        links.length > 0 && (
            <div className="p-4 bg-white shadow dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex flex-wrap">
                    {links.map((link, index) => {
                            return (<div
                                    key={index}
                                    className={getClassName(link.number === page, index)}
                                    onClick={() => updatePage(link)}>{link.number}</div>
                            )
                        }
                    )}
                </div>
            </div>
        )
    );
}

export default Pagination;