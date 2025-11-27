import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import "./ModalComplaint.css";

const ModalComplaint = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    district: "",
    description: "",
    name: "",
    email: ""
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = t('err_title');
    if (!formData.category) newErrors.category = t('err_category');
    if (!formData.district) newErrors.district = t('err_district');
    if (!formData.description.trim()) newErrors.description = t('err_desc');
    if (!formData.name.trim()) newErrors.name = t('err_name');
    if (!formData.email.trim()) {
      newErrors.email = t('err_email');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('err_email_invalid');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/complaints`, { //fetch("http://localhost:5000/api/complaints"
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            title: formData.title,
            category: formData.category,
            district: formData.district,
            description: formData.description,
            name: formData.name,
            email: formData.email
          })

        });

        if (response.ok) {
          alert(t('complaint_success'));
          setFormData({
            title: "",
            category: "",
            district: "",
            description: "",
            name: "",
            email: ""
          });
          setErrors({});
          onClose();
        } else {
          alert(t('complaint_error'));
        }
      } catch (error) {
        console.error("Ошибка:", error);
        alert(t('complaint_error'));
      }
    }
  };



  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{t('complaint_modal_title')}</h2>
        <p className="subtitle">{t('complaint_modal_subtitle')}</p>

        <form className="modal-form" onSubmit={handleSubmit}>

          <label>{t('complaint_title_label')}</label>
          <input
            type="text"
            name="title"
            placeholder={t('complaint_title_placeholder')}
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <span className="error">{errors.title}</span>}


          <label>{t('complaint_category_label')}</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">{t('complaint_category_placeholder')}</option>
            <option value="Транспортные выбросы">{t('cat_transport')}</option>
            <option value="Промышленные загрязнения">{t('cat_industrial')}</option>
            <option value="Пыль и строительные загрязнения">{t('cat_dust')}</option>
            <option value="Свалки и отходы">{t('cat_waste')}</option>
            <option value="Выбросы от отопления и частных домов">{t('cat_heating')}</option>
          </select>
          {errors.category && <span className="error">{errors.category}</span>}


          <label>{t('complaint_district_label')}</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
          >
            <option value="">{t('complaint_district_placeholder')}</option>
            <option value="Алмалинский район">{t('dist_almaly')}</option>
            <option value="Медеуский район">{t('dist_medeu')}</option>
            <option value="Ауэзовский район">{t('dist_auezov')}</option>
            <option value="Наурызбайский район">{t('dist_nauryzbay')}</option>
            <option value="Бостандыкский район">{t('dist_bostandyk')}</option>
            <option value="Алатауский район">{t('dist_alatau')}</option>
            <option value="Жетысуский район">{t('dist_zhetysu')}</option>
            <option value="Турксибский район">{t('dist_turksib')}</option>
          </select>
          {errors.district && <span className="error">{errors.district}</span>}


          <label>{t('complaint_desc_label')}</label>
          <textarea
            name="description"
            placeholder={t('complaint_desc_placeholder')}
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <span className="error">{errors.description}</span>}


          <p className="form-subtitle">{t('complaint_user_info')}</p>

          <div className="input-row">
            <div>
              <label>{t('complaint_name_label')}</label>
              <input
                type="text"
                name="name"
                placeholder={t('complaint_name_placeholder')}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div>
              <label>{t('complaint_email_label')}</label>
              <input
                type="email"
                name="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
          </div>



          <button type="submit" className="submit-btn">{t('complaint_submit_btn')}</button>
        </form>
      </div >
    </div >
  );
};

export default ModalComplaint;
