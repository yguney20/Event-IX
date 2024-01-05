CREATE TABLE IF NOT EXISTS Venues (
    VenueID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    Location VARCHAR(255),
    Capacity INT,
    ContactInfo VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Organizers (
    OrganizerID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    ContactInfo VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Events (
    EventID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Type VARCHAR(50) NOT NULL,
    Date TIMESTAMP, 
    VenueID INT,
    Description TEXT,
    OrganizerID INT,
    ImageURL VARCHAR(255), 
    FOREIGN KEY (VenueID) REFERENCES Venues(VenueID) ON DELETE CASCADE,
    FOREIGN KEY (OrganizerID) REFERENCES Organizers(OrganizerID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Users (
    userID INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(255),
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Students (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    School VARCHAR(255),
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS VIP (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS EmergencyContact (
    UserID INT,
    Phone VARCHAR(255),
    Name VARCHAR(255),
    Relation VARCHAR(255),
    PRIMARY KEY (UserID, Phone),
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Bookings (
    BookingID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    BookingDate TIMESTAMP,
    PaymentType VARCHAR(50),
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Reservations (
    ReservationID INT AUTO_INCREMENT PRIMARY KEY,
    VIPUserID INT,
    StartDate TIMESTAMP,
    EndDate TIMESTAMP,
    PaymentStatus VARCHAR(50) NOT NULL DEFAULT 'not paid' CHECK (PaymentStatus IN ('paid', 'not paid')),
    FOREIGN KEY (VIPUserID) REFERENCES VIP(UserID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Tickets (
    TicketID INT AUTO_INCREMENT PRIMARY KEY,
    BookingID INT,
    ReservationID INT,
    EventID INT,
    Price INT,
    SeatNumber VARCHAR(50),
    TicketStatus VARCHAR(50) NOT NULL DEFAULT 'not sold' CHECK (TicketStatus IN ('sold', 'reserved', 'not sold')),
    FOREIGN KEY (EventID) REFERENCES Events(EventID) ON DELETE CASCADE,
    FOREIGN KEY (BookingID) REFERENCES Bookings(BookingID) ON DELETE CASCADE,
    FOREIGN KEY (ReservationID) REFERENCES Reservations(ReservationID) ON DELETE CASCADE

);
