import express from "express";
import postgresClient from "../config/database.js";

const router = express.Router();

//get all contacts ;
//tbl_person_details tablosu ile tbl_authorization tablosunun person_id iler aynı olan
//verileri çekmek için kullanılır.
router.get("/", async (request, response) => {
  try {
    const text =
      "Select name, surname,degree,phone,email,room_no  From tbl_person_details INNER Join tbl_authorization ON tbl_person_details.person_id = tbl_authorization.person_id ORDER BY name ASC";
    const { rows } = await postgresClient.query(text);
    return response.status(200).json(rows);
  } catch (error) {
    console.log("error = ", error);
    return response.status(400).json({ message: error.message });
  }
});

export default router;
