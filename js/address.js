window.addEventListener("DOMContentLoaded", (event) => {
  
    const name = document.querySelector("#name");
    name.addEventListener("input", function () {
      if (name.value.length == 0) {
        setTextValue(".name-error", "");
        return;
      }
      try {
        new Contact().name = name.value;
        setTextValue(".name-error", "");
      } catch (error) {
        setTextValue(".name-error", error);
      }
    });
  
    const phoneNumber = document.querySelector("#phoneNumber");
    phoneNumber.addEventListener("input", function () {
      if (phoneNumber.value.length == 0) {
        setTextValue(".tel-error", "");
        return;
      }
      try {
        new Contact().phoneNumber = phoneNumber.value;
        setTextValue(".tel-error", "");
      } catch (error) {
        setTextValue(".tel-error", error);
      }
    });
  
    const address = document.querySelector("#address");
    address.addEventListener("input", function () {
      if (address.value.length == 0) {
        setTextValue(".address-error", "");
        return;
      }
      try {
        new Contact().address = address.value;
        setTextValue(".address-error", "");
      } catch (error) {
        setTextValue(".address-error", error);
      }
    });
  
    const zip = document.querySelector("#zip");
    zip.addEventListener("input", function () {
      if (zip.value.length == 0) {
        setTextValue(".zip-error", "");
        return;
      }
      try {
        new Contact().zip = zip.value;
        setTextValue(".zip-error", "");
      } catch (error) {
        setTextValue(".zip-error", error);
      }
    });
  
  });
  
  const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
  };