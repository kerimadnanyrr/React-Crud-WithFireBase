import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserContext";
import AppCrud from "../AppCrud";


const Home = () => {
  const { cikis, Kullanici } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await cikis();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
    <AppCrud>
      <div className="p-4 box mt-3 text-center">
        Merhaba Hoşgeldiniz. <br />
        {Kullanici && Kullanici.email}
      </div>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Çıkış Yap
        </Button>
      </div>
      
      </AppCrud>
    </>
  );
};

export default Home;