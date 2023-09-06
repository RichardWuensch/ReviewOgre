/*
ReviewOgerReloaded is a software that supports the user by organizing technical reviews.
Copyright (C) 2023 Hannah Meinhardt, Jakob Rechberger, Bastian Schindler, Nicolas Stoll, Richard Wünsch

ReviewOgerReloaded is made available under the terms of the MIT license. See the file LICENSE in the repository root for details.
*/


import Participant from '../../data/models/Participant';
import RoomSlot from '../../data/models/RoomSlot';
import Room from '../../data/models/Room';

export function getParticipants () {
  return [
    new Participant(undefined, undefined, 'Claudia', 'Delacruz', 'nulla.magna.malesuada@turpis.ca', 1, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Abel', 'Waters', 'leo.Vivamus@sapien.com', 1, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Dominic', 'Lawson', 'velit.eu@Fuscemi.edu', 1, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Leilani', 'Tate', 'malesuada.augue.ut@anteVivamus.edu', 2, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Grady', 'Hammond', 'Mauris@penatibuset.org', 2, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Bernard', 'Munoz', 'molestie.sodales.Mauris@semmagna.com', 2, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Randall', 'Rogers', 'semper@non.ca', 3, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Hop', 'Chandler', 'arcu.et.pede@tinciduntneque.co.uk', 3, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Thaddeus', 'Harrington', 'cursus.et@eleifendvitaeerat.ca', 3, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Winifred', 'MEndz', 'bibendum.fermentum@velesttempor.org', 4, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Nero', 'Gillespie', 'pharetra.Quisque@malesuada.edu', 4, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Idola', 'Bray', 'Donec.consectetuer@pede.org', 4, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Cameran', 'Shelton', 'et.eros@Nullamvitaediam.ca', 5, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Martin', 'Briggs', 'blandit.congue.In@etmagnis.edu', 5, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Dana', 'Woodard', 'molestie.tellus.Aenean@egestaslaciniaSed.org', 5, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Nevada', 'Odonnell', 'venenatis@lectus.edu', 6, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Karyn', 'Donaldson', 'metus.vitae.velit@acmi.ca', 6, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Tamekah', 'Burt', 'ac.nulla@in.ca', 6, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Leigh', 'Bradshaw', 'auctor.quis.tristique@Vivamus.ca', 7, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Samson', 'Jones', 'eget.lacus@a.co.uk', 7, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Ebony', 'Moore', 'egestas@Aenean.net', 7, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Yvette', 'Randall', 'risus@ultriciesligula.net', 8, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Jolie', 'Leonard', 'erat.eget.tincidunt@natoque.edu', 8, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Zachary', 'Scott', 'volutpat.Nulla@quisdiam.co.uk', 8, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Breanna', 'Hull', 'fringilla.cursus.purus@primisinfaucibus.org', 9, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Calista', 'Castillo', 'Sed.nec.metus@metusInnec.ca', 9, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Martina', 'Swanson', 'Duis.gravida.Praesent@Inatpede.co.uk', 9, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Madeline', 'Dixon', 'ipsum.Phasellus@Intinciduntcongue.ca', 10, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Gray', 'Miranda', 'est.tempor.bibendum@vehiculaetrutrum.net', 10, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Remedios', 'Koch', 'dictum.ultricies.ligula@sitametrisus.org', 10, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Chaney', 'Dean', 'a@tinciduntnuncac.com', 11, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Fleur', 'Weber', 'Nulla.tempor.augue@neceuismodin.net', 11, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Bertha', 'Jensen', 'enim.condimentum@insodaleselit.org', 11, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Finn', 'Moses', 'eget.lacus.Mauris@feugiatSed.org', 12, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Tiger', 'Pearson', 'viverra@sodalesnisi.ca', 12, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Felix', 'Armstrong', 'nibh@anteipsum.org', 12, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Brielle', 'Mcneil', 'ad.litora@nibhlaciniaorci.com', 13, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Cadman', 'Macias', 'velit@Craseget.com', 13, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Zahir', 'Kirby', 'metus.Aliquam.erat@ligulaDonecluctus.net', 13, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Doris', 'Humphrey', 'nonummy.ac.feugiat@ornareplacerat.com', 14, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Addison', 'Calderon', 'Aenean.gravida@Maecenasmifelis.co.uk', 14, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Keith', 'Wolf', 'id.ante@magnaPraesent.ca', 14, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Dawn', 'Chase', 'eget.massa.Suspendisse@metus.com', 15, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Adrienne', 'Townsend', 'placerat.velit.Quisque@hendreritnequeIn.co.uk', 15, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Shea', 'Cameron', 'vitae.risus.Duis@faucibus.edu', 15, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Dane', 'Sargent', 'elit@semegetmassa.co.uk', 16, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Mona', 'Massey', 'fringilla.mi.lacinia@commodo.co.uk', 16, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Sara', 'Weiss', 'lorem.luctus.ut@maurisanunc.edu', 16, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Wilma', 'Emerson', 'elementum.lorem.ut@nectellus.net', 17, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Amaya', 'Griffith', 'odio@maurisrhoncus.net', 17, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Zia', 'Drake', 'ultrices.iaculis.odio@et.co.uk', 17, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Kevyn', 'Mcintosh', 'Donec@Donecfelisorci.com', 18, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Eden', 'Murray', 'in.consectetuer.ipsum@ornare.co.uk', 18, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Maxine', 'Brennan', 'tortor.Nunc@inmagna.edu', 18, 'A', 'Native Speaker'),
    new Participant(undefined, undefined, 'Akeem', 'Massey', 'mauris.Suspendisse@nonlacinia.org', 19, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Ahmed', 'Wood', 'cubilia.Curae@sit.edu', 19, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Wynter', 'Rush', 'adipiscing.elit.Etiam@rutrum.net', 19, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Buffy', 'Gonzalez', 'id.risus.quis@diam.edu', 20, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Benedict', 'Tate', 'mattis.velit@Donecelementum.net', 20, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Dora', 'MEndz', 'ultrices.iaculis@eleifend.net', 20, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Carter', 'Farrell', 'lobortis.ultrices@Donecnonjusto.net', 21, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Kirby', 'Cochran', 'semper.auctor@gravidamolestiearcu.edu', 21, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Aspen', 'Blackburn', 'in.dolor@aliquet.org', 21, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Emily', 'Cantu', 'sollicitudin.commodo@ut.edu', 22, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Xenos', 'Carpenter', 'faucibus@mieleifend.ca', 22, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Kelsie', 'Sloan', 'Curabitur@laciniamattisInteger.edu', 22, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Andrew', 'Bruce', 'Donec.luctus.aliquet@nullaInteger.org', 23, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Willa', 'MEndz', 'et.magna.Praesent@utaliquamiaculis.org', 23, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Lydia', 'Ray', 'natoque.penatibus@eratEtiamvestibulum.ca', 23, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Baxter', 'Cameron', 'amet.nulla@portaelit.ca', 24, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Azalia', 'Merrill', 'dis.parturient.montes@nonmagna.edu', 24, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Grant', 'Bentley', 'lectus.ante@vestibulummassa.co.uk', 24, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Kiayada', 'Hubbard', 'Vestibulum.ante.ipsum@nisi.net', 25, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Carissa', 'Becker', 'ultrices.iaculis.odio@Fusce.net', 25, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Tobias', 'Watts', 'cursus@auctor.net', 25, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Wilma', 'Schmidt', 'facilisis.magna@iaculislacus.edu', 26, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Madison', 'Ramirez', 'lobortis.quam.a@diam.ca', 26, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Jermaine', 'Cohen', 'eleifend.nunc.risus@inmolestie.edu', 26, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Shannon', 'Golden', 'ante.dictum.mi@purusactellus.net', 27, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Elijah', 'Bauer', 'eu.tellus.eu@adipiscing.co.uk', 27, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Arsenio', 'Lester', 'semper.rutrum@Sedid.co.uk', 27, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Germaine', 'Mitchell', 'id.nunc@Duis.co.uk', 28, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Yardley', 'Santiago', 'convallis.est@dapibusligula.com', 28, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Cedric', 'Crane', 'mi@commodo.ca', 28, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Cherokee', 'Hyde', 'lobortis.mauris@In.com', 29, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Kasimir', 'Mercado', 'Suspendisse@Suspendisse.org', 29, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Maxine', 'Bartlett', 'sem.ut@tincidunt.ca', 29, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Christen', 'Cash', 'ut.lacus.Nulla@mollisvitae.co.uk', 30, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Kadeem', 'Shannon', 'nisl.Maecenas@sit.co.uk', 30, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Ariel', 'Duffy', 'Curae.Phasellus.ornare@convallisligulaDonec.edu', 30, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Barclay', 'Newman', 'iaculis.lacus@duiFuscediam.edu', 31, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Tatum', 'Greene', 'eu@eunibhvulputate.edu', 31, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Adara', 'Beasley', 'volutpat.Nulla@In.org', 31, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Raymond', 'Rogers', 'odio.sagittis@nunc.org', 32, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Hilary', 'Knight', 'Quisque@sedpede.net', 32, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Clarke', 'Ferrell', 'tempor@Praesentinterdum.co.uk', 32, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Kevin', 'Martin', 'Suspendisse.sed.dolor@et.com', 33, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Maisie', 'Talley', 'placerat.velit@sagittisplaceratCras.net', 33, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Yolanda', 'Pugh', 'ipsum.Donec.sollicitudin@fringillapurusmauris.ca', 33, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Oliver', 'Cobb', 'lectus@tellus.co.uk', 34, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Forrest', 'Santos', 'Mauris.nulla@velconvallisin.com', 34, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Nasim', 'Mann', 'Fusce.aliquam.enim@adipiscingligulaAenean.edu', 34, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Maxine', 'Bush', 'eget@arcuAliquam.co.uk', 35, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Pandora', 'Mcgowan', 'dis.parturient.montes@acturpisegestas.ca', 35, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Eaton', 'Mckee', 'nisl.arcu@Vestibulum.com', 35, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Risa', 'Davis', 'non.sollicitudin.a@dapibusgravida.com', 36, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Fay', 'Russell', 'iaculis@atlacusQuisque.org', 36, 'B', 'Native Speaker'),
    new Participant(undefined, undefined, 'Jaden', 'Kemp', 'ante.blandit@urnaUttincidunt.ca', 36, 'B', 'Native Speaker')
  ];
}

export function getRoomSlots () {
  return [
    new RoomSlot('1',
      new Date(2014, 10, 19),
      new Date(2014, 10, 19, 19, 0, 0),
      new Date(2014, 10, 19, 20, 40, 0),
      [
        // Date, startTime, EndTime
        new Room('1.212', false, 0),
        new Room('1.014', false, 0),
        new Room('1.020', false, 0),
        new Room('1.168', false, 0),
        new Room('0.463', false, 0),
        new Room('0.457', false, 0),
        new Room('0.447', false, 0)
      ]
    ),
    new RoomSlot('2',
      new Date(2014, 10, 20),
      new Date(2014, 10, 20, 17, 20, 0),
      new Date(2014, 10, 20, 19, 0, 0),
      [
        new Room('1.212', false, 0),
        new Room('1.014', false, 0),
        new Room('1.020', false, 0),
        new Room('1.168', false, 0)
      ]
    ),
    new RoomSlot('3',
      new Date(2014, 10, 20),
      new Date(2014, 10, 20, 19, 15, 0),
      new Date(2014, 10, 20, 21, 0, 0),
      [
        new Room('1.212', false, 0),
        new Room('1.014', false, 0),
        new Room('1.020', false, 0),
        new Room('1.168', false, 0),
        new Room('0.463', false, 0),
        new Room('0.457', false, 0)
      ]
    ),
    new RoomSlot('4',
      new Date(2014, 10, 21),
      new Date(2014, 10, 21, 11, 20, 0),
      new Date(2014, 10, 21, 13, 0, 0),
      [
        new Room(3, '1.014', false, 0),
        new Room(3, '1.020', false, 0),
        new Room(3, '1.168', false, 0)
      ]
    ),
    new RoomSlot('5',
      new Date(2014, 10, 21),
      new Date(2014, 10, 21, 15, 30, 0),
      new Date(2014, 10, 21, 17, 15, 0),
      [
        new Room('1.212', false, 0),
        new Room('1.014', false, 0),
        new Room('1.020', false, 0),
        new Room('1.168', false, 0),
        new Room('0.463', false, 0)
      ]
    ),
    new RoomSlot('6',
      new Date(2014, 10, 21),
      new Date(2014, 10, 21, 19, 0, 0),
      new Date(2014, 10, 21, 20, 40, 0),
      [
        new Room('1.212', false, 0),
        new Room('1.014', false, 0),
        new Room('1.020', false, 0),
        new Room('1.168', false, 0),
        new Room('0.463', false, 0),
        new Room('0.457', false, 0),
        new Room('0.447', false, 0)
      ]
    ),
    new RoomSlot('7',
      new Date(2014, 10, 22),
      new Date(2014, 10, 22, 11, 20, 0),
      new Date(2014, 10, 22, 13, 0, 0),
      [
        new Room('1.212', false, 0),
        new Room('1.014', false, 0),
        new Room('1.020', false, 0),
        new Room('1.168', false, 0)
      ]
    ),
    new RoomSlot('8',
      new Date(2014, 10, 22),
      new Date(2014, 10, 22, 19, 0, 0),
      new Date(2014, 10, 22, 20, 40, 0),
      [
        new Room('1.212', false, 0),
        new Room('1.014', false, 0),
        new Room('1.020', false, 0),
        new Room('1.168', false, 0),
        new Room('0.463', false, 0),
        new Room('0.457', false, 0),
        new Room('0.447', false, 0)
      ]
    ),
    new RoomSlot('9',
      new Date(2014, 10, 23),
      new Date(2014, 10, 23, 19, 0, 0),
      new Date(2014, 10, 23, 20, 40, 0),
      [
        new Room('1.212', false, 0),
        new Room('1.014', false, 0),
        new Room('1.020', false, 0),
        new Room('1.168', false, 0),
        new Room('0.463', false, 0),
        new Room('0.457', false, 0),
        new Room('0.447', false, 0)
      ]
    ),
    new RoomSlot('10',
      new Date(2014, 10, 24),
      new Date(2014, 10, 24, 19, 0, 0),
      new Date(2014, 10, 24, 20, 40, 0),
      [
        new Room('1.212', false, 0),
        new Room('1.014', false, 0),
        new Room('1.020', false, 0),
        new Room('1.168', false, 0),
        new Room('0.463', false, 0),
        new Room('0.457', false, 0),
        new Room('0.447', false, 0)
      ]
    )
  ];
}

export function getSettings () {
  return {
    authorIsNotary: false,
    breakForModeratorAndReviewer: false,
    abReview: false,
    internationalGroups: false
  };
}
