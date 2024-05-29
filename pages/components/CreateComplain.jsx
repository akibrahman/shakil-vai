"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import Modal from "react-modal";
import { convertCamelCaseToCapitalized } from "../../utils/camelToCapitalize";
import Pagination from "./Pagination";

const CreateComplain = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      //   marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const handleGD = async (e) => {
    e.preventDefault();
    if (
      !e.target.name.value ||
      !e.target.phoneNumber.value ||
      !e.target.description.value ||
      !e.target.address.value
    ) {
      toast.error("Fill the form properly!");
      return;
    }
    const dataa = {
      name: e.target.name.value,
      phoneNumber: e.target.phoneNumber.value,
      address: e.target.address.value,
      description: e.target.description.value,
      priority: e.target.priority.value,
      //   email: user.email,
    };
    console.log(dataa);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/make-a-gd",
        dataa
      );
      console.log(data);
      if (data.success) {
        toast.success("GD created successfully");
        setReloader(!reloader);
        closeModal();
        e.target.reset();
      } else throw new Error("Something went wrong, Try again!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, Try again!");
    }
  };
  const deleteGd = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/delete-a-gd?id=${id}`
      );
      if (data.success) {
        toast.success("GD deleted successfully");
        setReloader(!reloader);
      } else throw new Error("Something went wrong, Try again!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, Try again!");
    }
  };
  const [gds, setGds] = useState([]);
  const [gdsCount, setGdsCount] = useState(0);
  const [page, setPage] = useState(0);
  const [reloader, setReloader] = useState(true);

  const fetchGds = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/all-gds?page=${page}`
    );
    setGds(data.gds);
    setGdsCount(data.count);
    console.log(data);
  };
  useEffect(() => {
    fetchGds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, reloader]);
  const totalPages = Math.ceil(gdsCount / 10);
  const pages = [...new Array(totalPages ? totalPages : 0).fill(0)];

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="w-[800px] h-[500px] bg-stone-800 mx-auto p-4 overflow-y-scroll relative">
          <FaTimes
            className="absolute top-5 right-5 text-red-500 text-xl cursor-pointer"
            onClick={closeModal}
          />
          <p className="text-white text-2xl text-center underline">
            Create General Diary
          </p>
          <form
            onSubmit={handleGD}
            className="bg-transparent shadow-md rounded mx-auto"
          >
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phoneNumber"
                type="number"
                placeholder="Enter your Phone Number"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                name="address"
                type="text"
                placeholder="Enter your address"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                name="description"
                placeholder="Enter your description"
                rows={8}
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="priority"
              >
                Priority
              </label>
              <div className="inline-block relative w-64">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="priority"
                  name="priority"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline duration-300 active:scale-90"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <div className="bg-[#A3C7D6] w-full mx-auto py-5 px-6 rounded-xl font-semibold">
        <p className="text-center text-xl underline mb-5">Create Complain</p>
        <button
          onClick={openModal}
          className="bg-green-500 px-4 py-1 rounded-md active:scale-90 duration-300 text-white mb-5"
        >
          Create
        </button>
        <p className="text-center text-xl underline mb-5">
          Created Complain(s)
        </p>
        <div className="">
          <div className="flex items-center justify-center bg-[#141515] text-white py-2 w-full">
            <p className="w-[5%] text-center">SL.</p>
            <p className="w-[15%] text-center">ID</p>
            <p className="w-[10%] text-center">Name</p>
            <p className="w-[10%] text-center">Number</p>
            <p className="w-[10%] text-center">Address</p>
            <p className="w-[10%] text-center">Priority</p>
            <p className="w-[25%] text-center">Description</p>
            <p className="w-[10%] text-center">Status</p>
            <p className="w-[5%] text-center">Action</p>
          </div>
          {gds.map((gd, i) => (
            <div
              key={i}
              className="flex items-center justify-evenly gap-5 text-[#141515] py-2 w-full"
            >
              <p className="text-center w-[5%]">{i + 1}</p>
              <p className="text-center w-[15%] text-xs">{gd._id}</p>
              <p className="text-center w-[10%]">{gd.name}</p>
              <p className="text-center w-[10%]">{gd.phoneNumber}</p>
              <p className="text-center w-[10%]">{gd.address}</p>
              <p className="text-center w-[10%]">
                {convertCamelCaseToCapitalized(gd.priority)}
              </p>
              <p className="text-center w-[30%]">{gd.description}</p>
              <p className="text-center w-[10%]">
                {convertCamelCaseToCapitalized(gd.status)}
              </p>
              <p className="w-[5%]" onClick={() => deleteGd(gd._id)}>
                <FaDeleteLeft className="text-red-500 text-xl cursor-pointer" />
              </p>
            </div>
          ))}
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          pages={pages}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};

export default CreateComplain;
