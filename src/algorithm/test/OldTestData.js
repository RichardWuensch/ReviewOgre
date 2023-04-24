import Participant from '../../data/model/Participant';
import Room from '../../data/model/Room';
import RoomSlot from '../../data/model/RoomSlot';
import {ParticipantStore} from "../../data/store/ParticipantStore";
import {SlotRoomStore} from "../../data/store/SlotRoomStore";

export default class OldTestData {
  constructor () {
    this.participantStore = ParticipantStore.getSingleton();
    this.slotRoomStore = SlotRoomStore.getSingleton();

    this.authorIsNotary = true;
    [
      new Participant('Claudia', 'Delacruz', 'nulla.magna.malesuada@turpis.ca', 1),
      new Participant('Abel', 'Waters', 'leo.Vivamus@sapien.com', 1),
      new Participant('Dominic', 'Lawson', 'velit.eu@Fuscemi.edu', 1),
      new Participant('Leilani', 'Tate', 'malesuada.augue.ut@anteVivamus.edu', 2),
      new Participant('Grady', 'Hammond', 'Mauris@penatibuset.org', 2),
      new Participant('Bernard', 'Munoz', 'molestie.sodales.Mauris@semmagna.com', 2),
      new Participant('Randall', 'Rogers', 'semper@non.ca', 3),
      new Participant('Hop', 'Chandler', 'arcu.et.pede@tinciduntneque.co.uk', 3),
      new Participant('Thaddeus', 'Harrington', 'cursus.et@eleifendvitaeerat.ca', 3),
      new Participant('Winifred', 'MEndz', 'bibendum.fermentum@velesttempor.org', 4),
      new Participant('Nero', 'Gillespie', 'pharetra.Quisque@malesuada.edu', 4),
      new Participant('Idola', 'Bray', 'Donec.consectetuer@pede.org', 4),
      new Participant('Cameran', 'Shelton', 'et.eros@Nullamvitaediam.ca', 5),
      new Participant('Martin', 'Briggs', 'blandit.congue.In@etmagnis.edu', 5),
      new Participant('Dana', 'Woodard', 'molestie.tellus.Aenean@egestaslaciniaSed.org', 5),
      new Participant('Nevada', 'Odonnell', 'venenatis@lectus.edu', 6),
      new Participant('Karyn', 'Donaldson', 'metus.vitae.velit@acmi.ca', 6),
      new Participant('Tamekah', 'Burt', 'ac.nulla@in.ca', 6),
      new Participant('Leigh', 'Bradshaw', 'auctor.quis.tristique@Vivamus.ca', 7),
      new Participant('Samson', 'Jones', 'eget.lacus@a.co.uk', 7),
      new Participant('Ebony', 'Moore', 'egestas@Aenean.net', 7),
      new Participant('Yvette', 'Randall', 'risus@ultriciesligula.net', 8),
      new Participant('Jolie', 'Leonard', 'erat.eget.tincidunt@natoque.edu', 8),
      new Participant('Zachary', 'Scott', 'volutpat.Nulla@quisdiam.co.uk', 8),
      new Participant('Breanna', 'Hull', 'fringilla.cursus.purus@primisinfaucibus.org', 9),
      new Participant('Calista', 'Castillo', 'Sed.nec.metus@metusInnec.ca', 9),
      new Participant('Martina', 'Swanson', 'Duis.gravida.Praesent@Inatpede.co.uk', 9),
      new Participant('Madeline', 'Dixon', 'ipsum.Phasellus@Intinciduntcongue.ca', 10),
      new Participant('Gray', 'Miranda', 'est.tempor.bibendum@vehiculaetrutrum.net', 10),
      new Participant('Remedios', 'Koch', 'dictum.ultricies.ligula@sitametrisus.org', 10),
      new Participant('Chaney', 'Dean', 'a@tinciduntnuncac.com', 11),
      new Participant('Fleur', 'Weber', 'Nulla.tempor.augue@neceuismodin.net', 11),
      new Participant('Bertha', 'Jensen', 'enim.condimentum@insodaleselit.org', 11),
      new Participant('Finn', 'Moses', 'eget.lacus.Mauris@feugiatSed.org', 12),
      new Participant('Tiger', 'Pearson', 'viverra@sodalesnisi.ca', 12),
      new Participant('Felix', 'Armstrong', 'nibh@anteipsum.org', 12),
      new Participant('Brielle', 'Mcneil', 'ad.litora@nibhlaciniaorci.com', 13),
      new Participant('Cadman', 'Macias', 'velit@Craseget.com', 13),
      new Participant('Zahir', 'Kirby', 'metus.Aliquam.erat@ligulaDonecluctus.net', 13),
      new Participant('Doris', 'Humphrey', 'nonummy.ac.feugiat@ornareplacerat.com', 14),
      new Participant('Addison', 'Calderon', 'Aenean.gravida@Maecenasmifelis.co.uk', 14),
      new Participant('Keith', 'Wolf', 'id.ante@magnaPraesent.ca', 14),
      new Participant('Dawn', 'Chase', 'eget.massa.Suspendisse@metus.com', 15),
      new Participant('Adrienne', 'Townsend', 'placerat.velit.Quisque@hendreritnequeIn.co.uk', 15),
      new Participant('Shea', 'Cameron', 'vitae.risus.Duis@faucibus.edu', 15),
      new Participant('Dane', 'Sargent', 'elit@semegetmassa.co.uk', 16),
      new Participant('Mona', 'Massey', 'fringilla.mi.lacinia@commodo.co.uk', 16),
      new Participant('Sara', 'Weiss', 'lorem.luctus.ut@maurisanunc.edu', 16),
      new Participant('Wilma', 'Emerson', 'elementum.lorem.ut@nectellus.net', 17),
      new Participant('Amaya', 'Griffith', 'odio@maurisrhoncus.net', 17),
      new Participant('Zia', 'Drake', 'ultrices.iaculis.odio@et.co.uk', 17),
      new Participant('Kevyn', 'Mcintosh', 'Donec@Donecfelisorci.com', 18),
      new Participant('Eden', 'Murray', 'in.consectetuer.ipsum@ornare.co.uk', 18),
      new Participant('Maxine', 'Brennan', 'tortor.Nunc@inmagna.edu', 18),
      new Participant('Akeem', 'Massey', 'mauris.Suspendisse@nonlacinia.org', 19),
      new Participant('Ahmed', 'Wood', 'cubilia.Curae@sit.edu', 19),
      new Participant('Wynter', 'Rush', 'adipiscing.elit.Etiam@rutrum.net', 19),
      new Participant('Buffy', 'Gonzalez', 'id.risus.quis@diam.edu', 20),
      new Participant('Benedict', 'Tate', 'mattis.velit@Donecelementum.net', 20),
      new Participant('Dora', 'MEndz', 'ultrices.iaculis@eleifend.net', 20),
      new Participant('Carter', 'Farrell', 'lobortis.ultrices@Donecnonjusto.net', 21),
      new Participant('Kirby', 'Cochran', 'semper.auctor@gravidamolestiearcu.edu', 21),
      new Participant('Aspen', 'Blackburn', 'in.dolor@aliquet.org', 21),
      new Participant('Emily', 'Cantu', 'sollicitudin.commodo@ut.edu', 22),
      new Participant('Xenos', 'Carpenter', 'faucibus@mieleifend.ca', 22),
      new Participant('Kelsie', 'Sloan', 'Curabitur@laciniamattisInteger.edu', 22),
      new Participant('Andrew', 'Bruce', 'Donec.luctus.aliquet@nullaInteger.org', 23),
      new Participant('Willa', 'MEndz', 'et.magna.Praesent@utaliquamiaculis.org', 23),
      new Participant('Lydia', 'Ray', 'natoque.penatibus@eratEtiamvestibulum.ca', 23),
      new Participant('Baxter', 'Cameron', 'amet.nulla@portaelit.ca', 24),
      new Participant('Azalia', 'Merrill', 'dis.parturient.montes@nonmagna.edu', 24),
      new Participant('Grant', 'Bentley', 'lectus.ante@vestibulummassa.co.uk', 24),
      new Participant('Kiayada', 'Hubbard', 'Vestibulum.ante.ipsum@nisi.net', 25),
      new Participant('Carissa', 'Becker', 'ultrices.iaculis.odio@Fusce.net', 25),
      new Participant('Tobias', 'Watts', 'cursus@auctor.net', 25),
      new Participant('Wilma', 'Schmidt', 'facilisis.magna@iaculislacus.edu', 26),
      new Participant('Madison', 'Ramirez', 'lobortis.quam.a@diam.ca', 26),
      new Participant('Jermaine', 'Cohen', 'eleifend.nunc.risus@inmolestie.edu', 26),
      new Participant('Shannon', 'Golden', 'ante.dictum.mi@purusactellus.net', 27),
      new Participant('Elijah', 'Bauer', 'eu.tellus.eu@adipiscing.co.uk', 27),
      new Participant('Arsenio', 'Lester', 'semper.rutrum@Sedid.co.uk', 27),
      new Participant('Germaine', 'Mitchell', 'id.nunc@Duis.co.uk', 28),
      new Participant('Yardley', 'Santiago', 'convallis.est@dapibusligula.com', 28),
      new Participant('Cedric', 'Crane', 'mi@commodo.ca', 28),
      new Participant('Cherokee', 'Hyde', 'lobortis.mauris@In.com', 29),
      new Participant('Kasimir', 'Mercado', 'Suspendisse@Suspendisse.org', 29),
      new Participant('Maxine', 'Bartlett', 'sem.ut@tincidunt.ca', 29),
      new Participant('Christen', 'Cash', 'ut.lacus.Nulla@mollisvitae.co.uk', 30),
      new Participant('Kadeem', 'Shannon', 'nisl.Maecenas@sit.co.uk', 30),
      new Participant('Ariel', 'Duffy', 'Curae.Phasellus.ornare@convallisligulaDonec.edu', 30),
      new Participant('Barclay', 'Newman', 'iaculis.lacus@duiFuscediam.edu', 31),
      new Participant('Tatum', 'Greene', 'eu@eunibhvulputate.edu', 31),
      new Participant('Adara', 'Beasley', 'volutpat.Nulla@In.org', 31),
      new Participant('Raymond', 'Rogers', 'odio.sagittis@nunc.org', 32),
      new Participant('Hilary', 'Knight', 'Quisque@sedpede.net', 32),
      new Participant('Clarke', 'Ferrell', 'tempor@Praesentinterdum.co.uk', 32),
      new Participant('Kevin', 'Martin', 'Suspendisse.sed.dolor@et.com', 33),
      new Participant('Maisie', 'Talley', 'placerat.velit@sagittisplaceratCras.net', 33),
      new Participant('Yolanda', 'Pugh', 'ipsum.Donec.sollicitudin@fringillapurusmauris.ca', 33),
      new Participant('Oliver', 'Cobb', 'lectus@tellus.co.uk', 34),
      new Participant('Forrest', 'Santos', 'Mauris.nulla@velconvallisin.com', 34),
      new Participant('Nasim', 'Mann', 'Fusce.aliquam.enim@adipiscingligulaAenean.edu', 34),
      new Participant('Maxine', 'Bush', 'eget@arcuAliquam.co.uk', 35),
      new Participant('Pandora', 'Mcgowan', 'dis.parturient.montes@acturpisegestas.ca', 35),
      new Participant('Eaton', 'Mckee', 'nisl.arcu@Vestibulum.com', 35),
      new Participant('Risa', 'Davis', 'non.sollicitudin.a@dapibusgravida.com', 36),
      new Participant('Fay', 'Russell', 'iaculis@atlacusQuisque.org', 36),
      new Participant('Jaden', 'Kemp', 'ante.blandit@urnaUttincidunt.ca', 36)
    ].forEach(participant => {this.participantStore.put(participant)});

    [
      new RoomSlot(
        new Date(2014, 10, 19),
        new Date(2014, 10, 19, 19, 0, 0),
        new Date(2014, 10, 19, 20, 40, 0),
        [
          // Date, startTime, EndTime
          new Room('1.212', false),
          new Room('1.014', false),
          new Room('1.020', false),
          new Room('1.168', false),
          new Room('0.463', false),
          new Room('0.457', false),
          new Room('0.447', false)
        ]
      ),
      new RoomSlot(
        new Date(2014, 10, 20),
        new Date(2014, 10, 20, 17, 20, 0),
        new Date(2014, 10, 20, 19, 0, 0),
        [
          new Room('1.212', false),
          new Room('1.014', false),
          new Room('1.020', false),
          new Room('1.168', false)
        ]
      ),
      new RoomSlot(
        new Date(2014, 10, 20),
        new Date(2014, 10, 20, 19, 0, 0),
        new Date(2014, 10, 20, 20, 40, 0),
        [
          new Room('1.212', false),
          new Room('1.014', false),
          new Room('1.020', false),
          new Room('1.168', false),
          new Room('0.463', false),
          new Room('0.457', false)
        ]
      ),
      new RoomSlot(
        new Date(2014, 10, 21),
        new Date(2014, 10, 21, 11, 20, 0),
        new Date(2014, 10, 21, 13, 0, 0),
        [
          new Room('1.014', false),
          new Room('1.020', false),
          new Room('1.168', false)
        ]
      ),
      new RoomSlot(
        new Date(2014, 10, 21),
        new Date(2014, 10, 21, 15, 30, 0),
        new Date(2014, 10, 21, 17, 15, 0),
        [
          new Room('1.212', false),
          new Room('1.014', false),
          new Room('1.020', false),
          new Room('1.168', false),
          new Room('0.463', false)
        ]
      ),
      new RoomSlot(
        new Date(2014, 10, 21),
        new Date(2014, 10, 21, 19, 0, 0),
        new Date(2014, 10, 21, 20, 40, 0),
        [
          new Room('1.212', false),
          new Room('1.014', false),
          new Room('1.020', false),
          new Room('1.168', false),
          new Room('0.463', false),
          new Room('0.457', false),
          new Room('0.447', false)
        ]
      ),
      new RoomSlot(
        new Date(2014, 10, 22),
        new Date(2014, 10, 22, 11, 20, 0),
        new Date(2014, 10, 22, 13, 0, 0),
        [
          new Room('1.212', false),
          new Room('1.014', false),
          new Room('1.020', false),
          new Room('1.168', false)
        ]
      )
    ].forEach(slot => {this.slotRoomStore.put(slot)});
  }
}
