import { useState } from 'react'
import './HomePage.css'
import '../../components/SideBar.css'
import SideBar from '../../components/SideBar'
import '../../components/navigation-bar/NavigationBar.css'
import NavigationBar from '../../components/navigation-bar/NavigationBar'
import StartAdding from '../../components/start-adding/StartAdding'
import './HomePage.css'
import axios from "axios";

function HomePage() {
    const [testThing, setTestThing] = useState("");

    const test = () => {
        axios.get("api/test")
        .then(function (response) {
            console.log(response)
            setTestThing(response.data.test)
        })
        .catch(function (error) {
            console.log(error)
        })
    }
    return (
        <>
            <NavigationBar/>
            <SideBar/>
            <StartAdding/>
        </>
    )
}

export default HomePage