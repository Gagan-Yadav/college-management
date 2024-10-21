"use client"
import { ThreeCircles } from 'react-loader-spinner'

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <ThreeCircles
                visible={true}
                height="100"
                width="100"
                color="#00ff"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
}
