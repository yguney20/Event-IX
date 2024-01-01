INSERT INTO Venues (Name, Location, Capacity, ContactInfo) VALUES
('Fiyort', 'Istanbul/Sarıyer', 500, 'contact@fiyort.com'),
('GalataPort', 'Istanbul/Beyoğlu', 1000, 'contact@galataport.com');

INSERT INTO Organizers (Name, ContactInfo) VALUES
('Mehmet Faruk', 'mehmet.f@gmail.com'),
('Ayşe Deniz', 'adeniz@gmail.com');

INSERT INTO Events (Name, Type, Date, VenueID, Description, OrganizerID, ImageURL) VALUES
('Beyonce', 'Concert', '2023-01-01 00:00:00', 1, 'Beyonce Coming to Turkey after 20 years!', 1, 'images/beyonce.jpg'),
('Edis', 'Concert', '2023-02-01 00:00:00', 2, 'Hepimizin çok sevdiği Edis, eğlenceli performansıyla sahnede!', 2, 'images/edis.jpg'),
('Kırmızı Başlıklı Kız', 'Theatre', '2024-05-01 00:00:00', 2, 'Çocuklar için olan oyunumuz, Kırmızı Başlıklı Kızın farklı bir yorumu', 2,'images/kırmızıbaşlık.jpg'),
('New Year Musical', 'Musical', '2024-02-01 00:00:00', 2, 'Lets start the 2024 together!', 2, 'images/newyear.jpg'),
('Womens Basketball', 'Sports', '2024-01-01 00:00:00', 1, 'Galatsary vs Fenerbahçe womens team', 1, 'images/womanbasket.jpg');

INSERT INTO Users (firstName, lastName, email, phone, password) VALUES
('Serra', 'Işık', 'serraisik@email.com', '1234567890', 'serra123');

INSERT INTO EmergencyContact (UserID, Phone, Name, Relation) VALUES
(1, '1122334455', 'Alice Way', 'Mother'),
(1, '5566778899', 'Bob Carlos', 'Father');

INSERT INTO Bookings (UserID, BookingDate, PaymentType) VALUES
(1, '2023-01-10 00:00:00', 'Credit Card'),
(1, '2023-01-15 00:00:00', 'Debit Card'),
(1, '2024-04-20 19:00:00', 'Credit Card'),
(1, '2024-05-05 20:00:00', 'PayPal');

INSERT INTO Tickets (BookingID, ReservationID, EventID, Price, SeatNumber, TicketStatus) VALUES
(1, NULL, 1, 100, 'A1', 'sold'),
(2, NULL, 2, 150, 'B2', 'not sold'),
(3, NULL, 3, 150, 'B2', 'sold'),
(4, NULL, 4, 150, 'B2', 'sold');








