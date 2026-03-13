import Carousel from "@/components/common/Carousel";

const dummyData = [
    {
        id: 1,
        title: "Slide 1",
        desc: "Description 1",
        bgColor: "#ff0000",
        img:"https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 2,
        title: "Slide 2",
        desc: "Description 2",
        bgColor: "#00ff00",
        img:"/image1.jpg"
    },
    {
        id: 3,
        title: "Slide 3",
        desc: "Description 3",
        img:"/poster1.png"
    },
    {
        id: 4,
        title: "Slide 4",
        desc: "Description 4",
        img:"/poster2.png"
    },
];

export default function Home() {
    return <div><Carousel data={dummyData} activeSlide={2} /></div>;
}