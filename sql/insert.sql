INSERT INTO Venues (Name, Location, Capacity, ContactInfo) VALUES
('Fiyort', 'Istanbul/Sarıyer', 500, 'contact@fiyort.com'),
('GalataPort', 'Istanbul/Beyoğlu', 1000, 'contact@galataport.com'),
('KucukCiftlik Park', 'Istanbul/Sisli', 17000, 'concact@kucukciftlik.com'),
('Sinan Erdem Dome', 'Istanbul/Bakirkoy', 22000, 'contact@sinanerdemsports.com'),
('Zorlu PSM', 'Istanbul/Besiktas', 5000, 'contact@zorlupsm.com'),
('Besiktas Park', 'Istanbul/Besiktas', 42000, 'contact@bjk.com');

INSERT INTO Organizers (Name, ContactInfo) VALUES
('Mehmet Faruk', 'mehmet.f@gmail.com'),
('Ayşe Deniz', 'adeniz@gmail.com'),
('Zahide Sevim Şahin', 'zssahin@hotmail.com'),
('Onur Avcı', ' oavcı@gmail.com');


INSERT INTO Events (Name, Type, Date, VenueID, Description, OrganizerID, ImageURL) VALUES
('Beyonce', 'Concert', '2023-01-01 00:00:00', 1, 'Beyonce Coming to Turkey after 20 years!', 1, 'images/beyonce.jpg'),
('Edis', 'Concert', '2023-02-01 00:00:00', 2, 'Hepimizin çok sevdiği Edis, eğlenceli performansıyla sahnede!', 2, 'images/edis.jpg'),
('Kırmızı Başlıklı Kız', 'Theatre', '2024-05-01 00:00:00', 2, 'Çocuklar için olan oyunumuz, Kırmızı Başlıklı Kızın farklı bir yorumu', 2,'images/kırmızıbaşlık.jpg'),
('New Year Musical', 'Musical', '2024-02-01 00:00:00', 2, 'Lets start the 2024 together!', 2, 'images/newyear.jpg'),
('Womens Basketball', 'Sports', '2024-01-01 00:00:00', 1, 'Galatsary vs Fenerbahçe womens team', 1, 'images/womanbasket.jpg'),
('The Blaze', 'Concert', '2024-05-18 18:00:00', 3, 'Ünlü Fransız elektro ikilisi THE BLAZE, 5 yıl aradan sonra canlı performansı!', 4, 'images/theBlaze'),
('Tolga Çevik - Tolgshow', 'Theatre','2024-03-04 21:00:00', 5, 'Arkadaşım’ karakteri ile milyonları güldüren Tolga Çevik sahnede', 3, 'images/tolgaCevik' ),
('Amadeus', 'Musical', '2024-01-30 20:30:00', 5, 'Peter Shaffer tarafından kaleme alınan, dünya müzik tarihinin unutulmaz bestecileri Wolfgang Amadeus Mozart ile Antonio Salieri’nin eşsiz hikayesi AMADEUS sahnede!', 4, 'images/amadeus'),
('Super Cup', 'Sports', '2024-01-15 21:00:00', 6, '2022-2023 Sezonu Süper Lig Şampiyonu Galatasaray ile Ziraat Türkiye Kupası Şampiyonu Fenerbahçe arasında', 2, 'images/superCup' ),
('Metallica', 'Concert', '2024-05-24 18:00:00', 6, 'Attention Metallica fans! The band led by James Hetfield is returning to Europe', 2, 'images/metallica' );

INSERT INTO Users (firstName, lastName, email, phone, password) VALUES
('Serra', 'Işık', 'serraisik@email.com', '1234567890', 'serra123'),
('Emre', 'Kaya', 'emrekaya@email.com', '9876543210', 'emrek123'),
('Mert', 'Guney', 'mguney@email.com', '1234567890', 'mert123'),
('Bülent', 'Yıldız', 'bulentyildiz@email.com', '1234567890', 'bulenty123');

INSERT INTO EmergencyContact (UserID, Phone, Name, Relation) VALUES
(1, '1122334455', 'Alice Way', 'Mother'),
(1, '5566778899', 'Bob Carlos', 'Father'),
(2, '9988776655', 'Leyla Kaya', 'Sister'),
(3, '9999955555', 'Tony Cross', 'Brother'),
(4, '1111122222', 'Sevda Yıldız', 'Mother');

INSERT INTO Bookings (UserID, BookingDate, PaymentType) VALUES
(1, '2023-01-10 00:00:00', 'Credit Card'),
(1, '2023-01-15 00:00:00', 'Debit Card'),
(1, '2024-04-20 19:00:00', 'Credit Card'),
(1, '2024-05-05 20:00:00', 'PayPal'),
(2, '2023-02-10 00:00:00', 'Credit Card'),
(2, '2023-03-15 00:00:00', 'Debit Card'),
(3, '2024-01-10 13:00:00', 'Debit Card'),
(3, '2024-02-10 21:12:12', 'Credit Card'),
(3, '2024-03-11 10:36:41', 'Paypal'),
(4, '2024-01-19 13:43:54', 'Debit Card'),
(4, '2024-02-18 14:32:45', 'Debit Card'),
(4, '2024-03-24 23:42:12', 'Paypal');

INSERT INTO Tickets (BookingID, ReservationID, EventID, Price, SeatNumber, TicketStatus) VALUES
(1, NULL, 1, 100, 'A1', 'sold'),
(2, NULL, 2, 150, 'B2', 'sold'),
(3, NULL, 3, 150, 'B2', 'sold'),
(4, NULL, 4, 150, 'B2', 'sold'),
(5,NULL, 1, 100, 'C1', 'sold'),
(6,NULL, 2, 150, 'D2', 'sold'),
(7, NULL, 6, 500, NULL, 'sold'),
(8, NULL, 7, 400, 'A7', 'sold'),
(9, NULL, 8, 300, 'F8', 'sold'),
(10, NULL, 9, 600, 'DOGU B2', 'sold'),
(11, NULL, 10, 600, 'C2', 'sold'),
(12, Null, 6, 450, 'D10', 'sold');








