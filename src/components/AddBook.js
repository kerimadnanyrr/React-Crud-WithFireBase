import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import BookDataService from "../services/books.services";

const AddBook = ({ id, setBookId }) => {
  const [baslik, setBaslik] = useState("");
  const [yazar, setYazar] = useState("");
  const [durum, setStatus] = useState("Kitap Alınabilir.");
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (baslik === "" || yazar === "") {
      setMessage({ error: true, msg: "Tüm Alanlar Zorunludur.!" });
      return;
    }
    const newBook = {
      baslik,
      yazar,
      durum,
    };
    console.log(newBook);

    try {
      if (id !== undefined && id !== "") {
        await BookDataService.updateBook(id, newBook);
        setBookId("");
        setMessage({ error: false, msg: "Güncelleme Başarılı!" });
      } else {
        await BookDataService.addBooks(newBook);
        setMessage({ error: false, msg: "Yeni Kitap Ekleme Başarılı!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setBaslik("");
    setYazar("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await BookDataService.getBook(id);
      console.log("", docSnap.data());
      setBaslik(docSnap.data().title);
      setYazar(docSnap.data().author);
      setStatus(docSnap.data().status);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("İd: ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "başarısız" : "başarılı"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="baslik">
            <InputGroup>
              <InputGroup.Text id="baslik">B</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Kitap Başlığı "
                value={baslik}
                onChange={(e) => setBaslik(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="yazar">
            <InputGroup>
              <InputGroup.Text id="yazar">A</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Kitap Yazarı"
                value={yazar}
                onChange={(e) => setYazar(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="success"
              onClick={(e) => {
                setStatus("Ekle");
                setFlag(true);
              }}
            >
              Kitap Alınabilir
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setStatus("Kitap Alınamaz");
                setFlag(false);
              }}
            >
             Kitap Alınamaz

            </Button>
          </ButtonGroup>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Ekle/Güncelle
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddBook;