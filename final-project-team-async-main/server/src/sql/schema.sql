CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	notes varchar NOT NULL
);

INSERT INTO songs (id, song_title, notes) 
VALUES (1, 'Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4');

INSERT INTO songs (id, song_title, notes)
VALUES (2, 'taiko start','C3 C3 B1 C3 C3 B1 C3 C3 B1 C3 C3 B1 C3 C3 B1 C3 C3 B1 C3 C3 B1');


INSERT INTO songs (id, song_title, notes)
VALUES (3, 'star wars','C3 G4 F3 E4 D4 C3 G4 F3 E4 D4 C3 G4 F3 E4 F3 D4 C3 G4 F3 E4 D3 C3 G4 F3 E4 D4 C3 G4 F3 E4 F3 D4');
-- G A A F E D C C D E DA B G G A A F E D C G D D G A A F E D C C D E D A B G G C As G# G F D# D C G G G G G C F D C
-- G F E D C G F E D C G F E F D C G F E D C G F E D C G F E F D G G C');

INSERT INTO songs (id, song_title, notes)
VALUES (4, 'mario', 'E4 E4 E4 C4 E4 G4 G3 C4 G3 E3 F3 B3 Bb3 A3 G3 E4 G4 A4 F4 G4 E4 C4 D4 B3');

INSERT INTO songs (id, song_title, notes)
VALUES (5, 'Faded (Intro)', 'G4 G4 G4 B4 E5 E5 E5 D5 B4 B4 B4 B4 Gb4 Gb4 Gb4 E4');

INSERT INTO songs (id, song_title, notes)
VALUES (6, 'Canon in D', 'A5 Gb5 G5 A5 Gb5 G5 A5 A4 B4 Db5 D5 E5 Gb5 G5 Gb5 D5 E5 Gb5 Gb4 G4 A4 B4 A4 G4 A4 Gb4 G4 A4 G4 B4 A4 G4 Gb4 E4 Gb4 E4 D4 E4 Gb4 G4 A4 B4 G4 B4 A4 B4 Db5 D5 A4 B4 Db5 D5 E5 Gb5 G5 A5 Gb5');

INSERT INTO songs (id, song_title, notes)
VALUES (7, 'Kimi ga Suki da to Sakebitai', 'G2 A2 G2 G2 G2 A2 F2 G2 A2 G2 G2 F2 E2 D2 D2 C2 C2 D2 F2 F2 F2 E2 F2 G2 A2 A2 G2 G2 F2 F2 E2 F2 G2 A2 G2 A2 F2 E2 E2 D2 D2 C2 D2 C2 D2 C2 D2 C2 G2');