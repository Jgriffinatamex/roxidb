'use client'

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";



interface Props {
    pageNUmber: number;
    isNext: boolean;
    path: string;
}
const Pagination = ({
    pageNUmber,
    isNext,
    path
}: Props ) => {
    const router = useRouter();
    const handleNavigation = (type: string) => {
        let nextPageNUmber = pageNUmber;

        if (type === 'prev') {
            nextPageNUmber = Math.max(1, pageNUmber - 1);
        } else if (type === 'next') {
            nextPageNUmber = pageNUmber + 1;
        }
        if (nextPageNUmber > 1 ) {
            router.push(`/${path}?page=${nextPageNUmber}`);
        } else {
            router.push(`/${path}`);
        }
    };

    return(
        <>
        <div className="pagination">
            <Button
                onClick={() => handleNavigation('prev')}
                disabled={pageNUmber === 1}
                className="!text-small-regular text-light-2"
            >
                Prev
            </Button>
            <p className="text-small-semibold text-light-1">{pageNUmber}</p>
            <Button 
                onClick={() => handleNavigation('next')}
                disabled={!isNext}
                className="!text-small-regular text-light-2"
            >
                Next
            </Button>

        </div>
        </>
    )
}

export default Pagination