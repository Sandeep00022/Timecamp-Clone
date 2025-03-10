import {
  Box,
  Button,
  Flex,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import MySidebar from "../components/MySidebar";

import { AiFillSetting } from "react-icons/ai";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BiUserPlus } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GiPlayerTime } from "react-icons/gi";
import { BiSlider } from "react-icons/bi";
import { FaRegCreditCard } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoBookOutline } from "react-icons/io5";
import { BsChat } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { GoGift } from "react-icons/go";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { FaDownload } from "react-icons/fa";
import { FaFirefoxBrowser } from "react-icons/fa";
import { CgLogOff } from "react-icons/cg";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TimeSheet from "./TimeSheet";
import Dashboard from "./Dashboard";
import { useEffect } from "react";
import Project from "./Project";
import User from "./User";
import Tags from "./Tags";
import axios from "axios";
import { getProject } from "../store/project/action";
import { useDispatch, useSelector } from 'react-redux/es/exports';
import InvoiceRouter from "../Sandeep/sRouter/InvoiceRouter";
import Tabbs from "../Sandeep/tabs/Tabs";


// import Reports from '../components/Reports';

const HomePage = () => {
  const [toggle, setToggle] = useState(false);

  const [currComp, setCurrComp] = useState("Timesheet");

  // related to googleauth
  const [userdata, setUserdata] = useState("");

  const navigate = useNavigate()

  const location = useLocation();
  console.log(location);
  const getComponents = () => {
    if (location.pathname == "/homepage/timesheet") {
      setCurrComp("TimeSheet");
    } else if (location.pathname == "/homepage/dashboard") {
      setCurrComp("Dashboard");
    }
    else if(location.pathname == "/homepage/projects"){
      setCurrComp("Projects")
    }
    else if(location.pathname == "/homepage/tags"){
      setCurrComp("Tags")
    }
    else if(location.pathname == "/homepage/user"){
      setCurrComp("Users")
    }
    else if(location.pathname == "homepage/subscription"){
      setCurrComp("Subscription")
    }
    
  };

  // console.log(currComp);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("google",false)
    navigate("/")
  }

  useEffect(() => {
    getComponents();
  }, [location]);

  const handleToogle = () => {
    setToggle(!toggle);
  };

  // related to google auth
      useEffect(() => {
        if (localStorage.getItem("google")) {
          axios
            .get("https://pure-fjord-44762.herokuapp.com/googleuser")
            .then((res) => setUserdata(res.data));
        }
      }, []);
      
      useEffect(() => {
        if(userdata){
          localStorage.setItem("token",userdata.token);
        }
      },[userdata])
    // relared to google auth ended here

    const project = useSelector(state => state.project.project);
    console.log("project",project);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getProject())
    },[])


  return (
    <Box height={"100vh"} width="100" display="flex">
      <MySidebar setboxWidth={handleToogle} currComp={currComp} />

      <Box height={"100%"} width={toggle ? "95%" : "85%"}>
        {/* Top Premium purchase */}
        <Box
          width={"100%"}
          height="16"
          backgroundColor={"#f8f8f8"}
          borderBottom="1px solid gray"
          display="flex"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box
            width="45%"
            height={"12"}
            margin="auto"
            display={"flex"}
            gap="10px"
            alignItems={"center"}
          >
            <GiPlayerTime size={"25px"} color="gray" />
            <Text color={"gray"}>
              {" "}
              <b>12 days</b> left in your Pro trial{" "}
            </Text>
            {/* <Link to="/homepage/billing"> */}
            <Button
              _hover={{ backgroundColor: "#b58b00" }}
              backgroundColor={"#f7b801"}
              color="aliceblue"
              onClick={() => navigate("/homepage/billing")}
            >
              Subscribe to Pro
            </Button>
            {/* </Link> */}
            <Button
              backgroundColor={"#fff"}
              fontWeight="normal"
              border="0.5px solid gray"
            >
              Book a Demo
            </Button>
          </Box>
        </Box>

        {/*  User Sections */}
        <Box
          width={"100%"}
          height="16"
          borderBottom="1px solid gray"
          display="flex"
          p={"6"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box>
            <Text fontSize={"xl"} fontWeight="semibold">
              {currComp}
            </Text>
          </Box>
          <Box
            height={"40px"}
            width="44"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {/* Setting popOver */}

            <Box>
              <Popover trigger={"hover"} placement={"bottom"}>
                <PopoverTrigger>
                  <Link color={"gray.500"} _hover={{ color: "#25cf60" }}>
                    <AiFillSetting
                      size={"30px"}
                      _hover={{ color: "#25cf60" }}
                    />
                  </Link>
                </PopoverTrigger>
                <PopoverContent
                  fontSize="14px"
                  width="210px"
                  p="6"
                  border="1px solid green"
                >
                  <Stack>
                    <Flex
                      _hover={{ backgroundColor: "#f8f8f8", cursor: "pointer" }}
                      p="2"
                      alignItems="center"
                      gap="25px"
                    >
                      <AiFillSetting size={"25px"} color="gray" />
                      <Text fontSize="15px">Setting</Text>
                    </Flex>
                    <Flex
                      _hover={{ backgroundColor: "#f8f8f8", cursor: "pointer" }}
                      p="2"
                      alignItems="center"
                      gap="25px"
                    >
                      <BiSlider size={"25px"} color="gray" />
                      <Text fontSize="15px">Integrations</Text>
                    </Flex>
                    <Flex
                      _hover={{ backgroundColor: "#f8f8f8", cursor: "pointer" }}
                      p="2"
                      alignItems="center"
                      gap="25px"
                    >
                      <FaRegCreditCard size={"25px"} color="gray" />
                      <Text fontSize="15px">Subscription</Text>
                    </Flex>
                  </Stack>
                </PopoverContent>
              </Popover>
            </Box>

            {/* Question Popover */}

            <Box>
              <Popover trigger={"hover"} placement={"bottom"}>
                <PopoverTrigger>
                  <Link color={"gray.500"} _hover={{ color: "#25cf60" }}>
                    <AiOutlineQuestionCircle
                      size={"30px"}
                      _hover={{ color: "#25cf60" }}
                    />
                  </Link>
                </PopoverTrigger>
                <PopoverContent
                  fontSize="14px"
                  width="210px"
                  p="4"
                  border="1px solid green"
                >
                  <Stack>
                    <Flex
                      _hover={{ backgroundColor: "#f8f8f8", cursor: "pointer" }}
                      p="2"
                      alignItems="center"
                      gap="25px"
                    >
                      <AiOutlineInfoCircle size={"22px"} color="gray" />
                      <Text fontSize="13px">Help</Text>
                    </Flex>
                    <Flex
                      _hover={{ backgroundColor: "#f8f8f8", cursor: "pointer" }}
                      p="2"
                      alignItems="center"
                      gap="25px"
                    >
                      <IoBookOutline size={"22px"} color="gray" />
                      <Text fontSize="13px">Knowldege base</Text>
                    </Flex>
                    <Flex
                      _hover={{ backgroundColor: "#f8f8f8", cursor: "pointer" }}
                      p="2"
                      alignItems="center"
                      gap="25px"
                    >
                      <BsChat size={"22px"} color="gray" />
                      <Text fontSize="13px">Send feedback</Text>
                    </Flex>
                    <Flex
                      _hover={{ backgroundColor: "#f8f8f8", cursor: "pointer" }}
                      p="2"
                      alignItems="center"
                      gap="25px"
                    >
                      <AiOutlineHeart size={"22px"} color="gray" />
                      <Text fontSize="13px">Become a Partner</Text>
                    </Flex>
                    <hr />
                    <Flex
                      _hover={{ backgroundColor: "#f8f8f8", cursor: "pointer" }}
                      p="2"
                      alignItems="center"
                      gap="25px"
                    >
                      <GoGift size={"22px"} color="gray" />
                      <Text fontSize="13px">What's new</Text>
                    </Flex>
                    <Flex
                      _hover={{ backgroundColor: "#f8f8f8", cursor: "pointer" }}
                      p="2"
                      alignItems="center"
                      gap="25px"
                    >
                      <HiOutlineSpeakerphone size={"22px"} color="gray" />
                      <Text fontSize="13px">Suggest a feature</Text>
                    </Flex>
                  </Stack>
                </PopoverContent>
              </Popover>
            </Box>

            {/* Add User */}
            <BiUserPlus
              size={"30px"}
              color="#25cf60"
              _hover={{ cursor: "pointer" }}
            />

            {/* User Information */}
            <Box borderRadius={"50%"}>
              <Popover trigger={"hover"} placement={"bottom-start"}>
                <PopoverTrigger>
                  <Link color={"gray.500"}>
                    <FaUserCircle size={"30px"} color="gray" />
                  </Link>
                </PopoverTrigger>
                <PopoverContent fontSize="14px" width="300px">
                  <Stack>
                    <Box
                      p="4"
                      borderBottom={"1px solid gray"}
                      display="flex"
                      gap="10px"
                      width={"100%"}
                      height="100px"
                      alignItems="center"
                    >
                      <FiUser size={"35px"} color="gray" />
                      <Box>
                        <Text fontWeight={"semibold"} fontSize="15px">
                          {"Contactme.rishiranjan"}
                        </Text>
                        <Text>{"Contactme.rishiranjan@gmail.com"}</Text>
                      </Box>
                    </Box>
                    <Flex
                      _hover={{ backgroundColor: "#f8f8f8", cursor: "pointer" }}
                      p="4"
                      alignItems="center"
                      gap="25px"
                    >
                      <FaDownload size={"25px"} color="gray" />
                      <Text fontSize="15px">Download App</Text>
                    </Flex>
                    <Flex
                      _hover={{ backgroundColor: "#f8f8f8", cursor: "pointer" }}
                      p="4"
                      alignItems="center"
                      gap="25px"
                    >
                      <FaFirefoxBrowser size={"25px"} color="gray" />
                      <Text fontSize="15px">Browser Plugin</Text>
                    </Flex>
                    <hr />
                    <Box
                      _hover={{ backgroundColor: "#f8f8f8", cursor: "pointer" }}
                      display={"flex"}
                      alignItems="center"
                      p={"4"}
                      gap="25px"
                      onClick={handleLogout}
                    >
                      <CgLogOff size={"25px"} color="gray" />
                      <Text fontSize={"18px"}>Logout</Text>
                    </Box>
                  </Stack>
                </PopoverContent>
              </Popover>
            </Box>
          </Box>
        </Box>

        {/* Components Sections */}
        <Box height={"83%"} width="100%">
          <Outlet/>         
        </Box>
      </Box>
      
    </Box>
  );
};

export default HomePage;
