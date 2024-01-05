INSERT INTO Venues (Name, Location, Capacity, ContactInfo) VALUES
('Fiyort', 'Istanbul/Sarıyer', 500, 'contact@fiyort.com'),
('GalataPort', 'Istanbul/Beyoğlu', 1000, 'contact@galataport.com'),
('KucukCiftlik Park', 'Istanbul/Sisli', 17000, 'concact@kucukciftlik.com'),
('Sinan Erdem Dome', 'Istanbul/Bakirkoy', 22000, 'contact@sinanerdemsports.com'),
('Zorlu PSM', 'Istanbul/Besiktas', 5000, 'contact@zorlupsm.com'),
('Besiktas Park', 'Istanbul/Besiktas', 42000, 'contact@bjk.com'),
('Uniq Hall', 'Istanbul/Maslak', 1156, 'contact@uniqhall.com'),
('Klein Phönix', 'Istanbul/Maslak', 3500, 'contact@kleinphonix.com');

INSERT INTO Organizers (Name, ContactInfo) VALUES
('Mehmet Faruk', 'mehmet.f@gmail.com'),
('Ayşe Deniz', 'adeniz@gmail.com'),
('Zahide Sevim Şahin', 'zssahin@hotmail.com'),
('Onur Avcı', ' oavcı@gmail.com'),
('Emre Yılmaz', 'eyilmaz@hotmail.com'),
('Melis Duman', 'melis_duman@gmail.com');


INSERT INTO Events (Name, Type, Date, VenueID, Description, OrganizerID, ImageURL) VALUES
('Beyonce', 'Concert', '2023-01-01 00:00:00', 1, 'Beyonce Coming to Turkey after 20 years!', 1, 'images/beyonce.jpg'),
('Edis', 'Concert', '2023-02-01 00:00:00', 2, 'Hepimizin çok sevdiği Edis, eğlenceli performansıyla sahnede!', 2, 'images/edis.jpg'),
('Kırmızı Başlıklı Kız', 'Theatre', '2024-05-01 00:00:00', 2, 'Çocuklar için olan oyunumuz, Kırmızı Başlıklı Kızın farklı bir yorumu', 2,'images/kirmizibaslik.jpg'),
('New Year Musical', 'Musical', '2024-02-01 00:00:00', 2, 'Lets start the 2024 together!', 2, 'images/newyear.jpg'),
('Womens Basketball', 'Sports', '2024-01-01 00:00:00', 1, 'Galatsary vs Fenerbahçe womens team', 1, 'images/womanbasket.jpg'),
('The Blaze', 'Concert', '2024-05-18 18:00:00', 3, 'Ünlü Fransız elektro ikilisi THE BLAZE, 5 yıl aradan sonra canlı performansı!', 4, 'images/theBlaze.jpg'),
('Tolga Çevik - Tolgshow', 'Theatre','2024-03-04 21:00:00',5, 'Arkadaşım’ karakteri ile milyonları güldüren Tolga Çevik sahnede', 3, 'images/tolgaCevik.png' ),
('Amadeus', 'Musical', '2024-01-30 20:30:00', 5, 'Peter Shaffer tarafından kaleme alınan, dünya müzik tarihinin unutulmaz bestecileri Wolfgang Amadeus Mozart ile Antonio Salieri’nin eşsiz hikayesi AMADEUS sahnede!', 4, 'images/amadeus.jpg'),
('Super Cup', 'Sports', '2024-01-15 21:00:00', 6, '2022-2023 Sezonu Süper Lig Şampiyonu Galatasaray ile Ziraat Türkiye Kupası Şampiyonu Fenerbahçe arasında', 6, 'images/superCup.jpg' ),
('Metallica', 'Concert', '2024-05-24 18:00:00', 6, 'Attention Metallica fans! The band led by James Hetfield is returning to Europe', 2, 'images/metallica.jpg' ),
('Polo&Pan', 'Concert', '2024-03-11 00:00:00', 8, "Tropikal seslerle harmanladıkları house-elektronik müzikal seçkilerini, ilhamını aldıkları 90’lar hip-hop’ı ile birleştiren ve kendilerine ait bir sound yaratmayı başaran Fransız duo Polo & Pan Klein Phönix'te!", 5, 'images/polopan.jpg'),
('Richard', 'Theatre', '2023-01-03 00:00:00', 7, "Okan Bayülgen'in, Shakespeare’in ünlü trajedisinden hareketle yazıp yönettiği Richard Uniq Hall'da!", 6, 'images/richard.jpg'),
('SOLOMUN', 'Concert', '2023-01-03 00:00:00', 8, "Klein Phönix SOLOMUN'u İstanbul'da ağırlıyor!", 5, 'images/solomun.jpg'),
('Peggy Gou', 'Concert' , '2024-08-07 00:00:00', 8, "Elektronik müzik sahnesinde ikonik kelimesinin tam karşılığı olan Peggy Gou 7 Ağustos'ta Klein Phönix'te!", 6, 'images/peggygou.jpg'),
('David Guetta', 'Concert', '2023-07-23 00:00:00', 8, "Dünyanın en büyük dans müziği idolu David Guetta, İstanbul'da...", 5, 'images/davidGuetta.jpg'),
('Saatleri Ayarlama Enstitüsü', 'Theatre', '2024-01-05 00:00:00', 7, "Doğu ve batı, eski ve yeni, geleneksel ve modern kutupları arasında salınıp duran Ahmet Hamdi Tanpınar’ın ölümsüz eseri Saatleri Ayarlama Enstitüsü, Serkan Keskin’in onlarca surete büründüğü bir oyunculuk şöleniyle sinema ve tiyatronun iç içe geçtiği çağdaş bir uyarlama olarak izleyici ile buluşuyor.", 5, 'images/saatleriayarlamaenstitusu.jpg'),
('Cimri', 'Theatre', '2024-05-12 00:00:00', 7, "Moliere'in ünlü Cimri oyunu, Tansu Biçer'in yorumu ve Serkan Keskin'in çok konuşulan Harpagon performansıyla Uniq Hall'da!", 6, 'images/cimri.jpg'),
('Zengin Mutfağı', 'Theatre', '2023-02-10 00:00:00', 7, "Şener Şen, DasDas prodüksiyonu olan Zengin Mutfağı’nda sahnelediği muhteşem performansıyla Uniq Hall'da!", 4, 'images/zenginmutfagi.jpg'),
('Swan Lake', 'Dance', '2024-10-27 00:00:00', 5, "The Kremlin Ballet will perform Tchaikovsky's famous masterpiece Swan Lake on the stage of the Zorlu Center.", 3, 'images/swanlake.jpg'),
("Notre Dame'ın Kamburu", 'Musical', '2022-11-03 00:00:00', 5, "TÜM ZAMANLARIN EN İYİ FRANSIZ MÜZİKALİ NOTRE DAME DE PARIS, ZORLU PSM’DE!", 6, 'images/notreDame.jpg');

INSERT INTO Users (firstName, lastName, email, phone, password) VALUES
('Serra', 'Işık', 'serraisik@email.com', '1234567890', 'serra123'),
('Emre', 'Kaya', 'emrekaya@email.com', '9876543210', 'emrek123'),
('Mert', 'Guney', 'mguney@email.com', '1234567890', 'mert123'),
('Bülent', 'Yıldız', 'bulentyildiz@email.com', '1234567890', 'bulenty123'),
('Sera Su', 'Gürbüz', 'serasu@gmail.com', '5328761517', 'sera135'),
('Can', 'Özkan', 'canozkan@gmail.com', '5301112233', '123456');

INSERT INTO EmergencyContact (UserID, Phone, Name, Relation) VALUES
(1, '1122334455', 'Alice Way', 'Mother'),
(1, '5566778899', 'Bob Carlos', 'Father'),
(2, '9988776655', 'Leyla Kaya', 'Sister'),
(3, '9999955555', 'Tony Cross', 'Brother'),
(4, '1111122222', 'Sevda Yıldız', 'Mother'),
(5, '5339871122', 'Sadi Gürbüz', 'Father'),
(6, '5326005533', 'Saadet Özkan', 'Mother');

INSERT INTO Bookings (UserID, BookingDate, PaymentType) VALUES
(1, '2023-01-10 00:00:00', 'Credit Card'),
(1, '2023-01-15 00:00:00', 'Debit Card'),
(1, '2024-04-20 19:00:00', 'Credit Card'),
(1, '2024-05-05 20:00:00', 'PayPal'),
(2, '2023-02-10 00:00:00', 'Credit Card'),
(2, '2023-03-15 00:00:00', 'Debit Card'),
(3, '2024-01-10 13:00:00', 'Debit Card'),
(3, '2024-02-10 21:12:12', 'Credit Card'),
(3, '2024-03-11 10:36:41', 'PayPal'),
(4, '2024-01-19 13:43:54', 'Debit Card'),
(4, '2024-02-18 14:32:45', 'Debit Card'),
(4, '2024-03-24 23:42:12', 'PayPal'),
(5, '2024-01-01 00:00:00', 'Credit Card'),
(5, '2023-01-01 00:00:00', 'PayPal'),
(5, '2024-01-02 00:00:00', 'Credit Card'),
(5, '2024-01-01 10:12:51', 'Debit Card'),
(6, '2022-12-12 00:00:00', 'Credit Card'),
(6, '2024-03-10 00:00:00', 'PayPal'),
(6, '2023-02-01 00:00:00', 'Debit Card'),
(6, '2024-01-02 00:00:00', 'Credit Card');

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
(12, NULL, 6, 450, 'D10', 'sold'),
(13, NULL, 11, 500, NULL, 'sold'),
(14, NULL, 12, 300, 'E11', 'sold'),
(15, NULL, 16, 200, 'D6', 'sold'),
(16, NULL, 19, 750, 'B21', 'sold'),
(17, NULL, 13, 450, NULL, 'sold'),
(18, NULL, 19, 750, 'B19', 'sold'),
(NULL, NULL, 20, 500, 'A3', 'not sold'),
(NULL, NULL, 20, 500, 'A4', 'not sold'),
(NULL, NULL, 20, 500, 'A5', 'not sold'),
(NULL, NULL, 20, 500, 'A6', 'not sold'),
(19, NULL, 18, 200, 'C3', 'sold'),
(20, NULL, 14, 800, NULL, 'sold');












