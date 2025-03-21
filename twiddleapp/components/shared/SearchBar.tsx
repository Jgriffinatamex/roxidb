'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

interface Props {
    routeType: string;
}

const SearchBar = ({routeType}: Props) => {
    const router = useRouter();
    const [search, setSearch] = useState('');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search) {
                router.push(`/${routeType}?q=` + search);
            } else {
                router.push(`/${routeType}`);
            }
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    },[search, routeType]);//useEffect triggers anytime something in array changes

    return(
        <div className="searchbar">
            <Image
                src='/assets/search.svg'
                alt="search"
                width={24}
                height={24}
                className="object-contain"
            />
            <Input
                id="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="look around"
                className="no-focus searhbar-input"
            />
        </div>
    )

}


export default SearchBar