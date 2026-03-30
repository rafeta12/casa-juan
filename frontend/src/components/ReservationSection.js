import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar } from './ui/calendar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import { CheckCircle, Loader2 } from 'lucide-react';
import axios from 'axios';
import { format } from 'date-fns';
import { es, enUS, de } from 'date-fns/locale';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ReservationSection = () => {
  const { language, t } = useLanguage();
  const [date, setDate] = useState(undefined);
  const [timeSlots, setTimeSlots] = useState({ lunch: [], dinner: [] });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    time: '',
    guests: '',
    notes: ''
  });

  const localeMap = { es, en: enUS, de };

  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const response = await axios.get(`${API}/time-slots`);
        setTimeSlots(response.data);
      } catch (error) {
        console.error('Error fetching time slots:', error);
        setTimeSlots({
          lunch: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00"],
          dinner: ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"]
        });
      }
    };
    fetchTimeSlots();
  }, []);

  const allTimeSlots = [...timeSlots.lunch, ...timeSlots.dinner];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !formData.time || !formData.guests) return;

    setIsSubmitting(true);
    try {
      await axios.post(`${API}/reservations`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: format(date, 'yyyy-MM-dd'),
        time: formData.time,
        guests: parseInt(formData.guests),
        notes: formData.notes,
        language
      });
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', time: '', guests: '', notes: '' });
      setDate(undefined);
    } catch (error) {
      console.error('Error creating reservation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section 
        id="reservation"
        className="py-16 md:py-24 bg-[#F9F6F0]"
        data-testid="reservation-section"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-[#F2EDE4] border border-[#E5DFD3] p-12 md:p-16">
            <CheckCircle className="w-16 h-16 text-[#7A8B76] mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-medium text-[#2C2A26] mb-4">
              {t('reservation.success')}
            </h2>
            <p className="text-[#59554F] mb-8">
              {t('reservation.successMessage')}
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="bg-[#C05A46] hover:bg-[#A34A38] text-white px-8 py-3 font-medium transition-colors"
              data-testid="new-reservation-btn"
            >
              {t('nav.reserve')}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="reservation"
      className="py-16 md:py-24 bg-[#F9F6F0]"
      data-testid="reservation-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-xs uppercase tracking-[0.2em] font-bold text-[#C05A46] mb-4">
            {t('reservation.title')}
          </span>
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl lg:text-5xl font-medium text-[#2C2A26] tracking-tight">
            {t('reservation.subtitle')}
          </h2>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Image */}
          <div className="aspect-[4/3] lg:aspect-auto lg:h-full min-h-[400px] overflow-hidden">
            <img 
              src="https://customer-assets.emergentagent.com/job_casa-juan-mesa/artifacts/5d915sh5_image.png"
              alt="Restaurant interior"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form */}
          <div className="bg-[#F2EDE4] border border-[#E5DFD3] p-6 md:p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Calendar */}
              <div>
                <Label className="text-[#2C2A26] font-medium mb-2 block">
                  {t('reservation.date')}
                </Label>
                <div className="flex justify-center bg-white p-4 border border-[#E5DFD3]">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    locale={localeMap[language]}
                    disabled={(date) => date < new Date()}
                    className="pointer-events-auto"
                    data-testid="reservation-calendar"
                  />
                </div>
              </div>

              {/* Time & Guests */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#2C2A26] font-medium mb-2 block">
                    {t('reservation.time')}
                  </Label>
                  <Select 
                    value={formData.time} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}
                  >
                    <SelectTrigger 
                      className="bg-white border-[#E5DFD3] focus:ring-[#C05A46] h-12"
                      data-testid="time-select"
                    >
                      <SelectValue placeholder={t('reservation.selectTime')} />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {allTimeSlots.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-[#2C2A26] font-medium mb-2 block">
                    {t('reservation.guests')}
                  </Label>
                  <Select 
                    value={formData.guests} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, guests: value }))}
                  >
                    <SelectTrigger 
                      className="bg-white border-[#E5DFD3] focus:ring-[#C05A46] h-12"
                      data-testid="guests-select"
                    >
                      <SelectValue placeholder={t('reservation.selectGuests')} />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? t('reservation.person') : t('reservation.people')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Name */}
              <div>
                <Label className="text-[#2C2A26] font-medium mb-2 block">
                  {t('reservation.name')}
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-white border-[#E5DFD3] focus:ring-[#C05A46] h-12"
                  data-testid="name-input"
                />
              </div>

              {/* Email */}
              <div>
                <Label className="text-[#2C2A26] font-medium mb-2 block">
                  {t('reservation.email')}
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-white border-[#E5DFD3] focus:ring-[#C05A46] h-12"
                  data-testid="email-input"
                />
              </div>

              {/* Phone */}
              <div>
                <Label className="text-[#2C2A26] font-medium mb-2 block">
                  {t('reservation.phone')}
                </Label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="bg-white border-[#E5DFD3] focus:ring-[#C05A46] h-12"
                  data-testid="phone-input"
                />
              </div>

              {/* Notes */}
              <div>
                <Label className="text-[#2C2A26] font-medium mb-2 block">
                  {t('reservation.notes')}
                </Label>
                <Textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="bg-white border-[#E5DFD3] focus:ring-[#C05A46] resize-none"
                  data-testid="notes-input"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || !date || !formData.time || !formData.guests}
                className="w-full bg-[#C05A46] hover:bg-[#A34A38] disabled:bg-[#E5DFD3] disabled:text-[#59554F] text-white py-4 font-medium transition-colors flex items-center justify-center gap-2"
                data-testid="submit-reservation"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>...</span>
                  </>
                ) : (
                  t('reservation.submit')
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationSection;
