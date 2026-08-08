import React, { useState, useEffect, useMemo } from 'react';
import {
  Volume2, RotateCcw, ChevronLeft, ChevronRight, Layers, BookOpen,
  Gauge, Shuffle, Users, Home, Gamepad2, GraduationCap, Library,
  ShoppingCart, MapPin, Plane
} from 'lucide-react';

const CTX = {
  Friends:     { label: "Friends",     icon: Users,        cls: "bg-amber-100 text-amber-700" },
  Home:        { label: "Home",        icon: Home,         cls: "bg-emerald-100 text-emerald-700" },
  Playing:     { label: "Playing",     icon: Gamepad2,     cls: "bg-pink-100 text-pink-700" },
  School:      { label: "School",      icon: GraduationCap,cls: "bg-blue-100 text-blue-700" },
  Library:     { label: "Library",     icon: Library,      cls: "bg-violet-100 text-violet-700" },
  Supermarket: { label: "Supermarket", icon: ShoppingCart, cls: "bg-orange-100 text-orange-700" },
  Street:      { label: "Street",      icon: MapPin,       cls: "bg-teal-100 text-teal-700" },
  Travel:      { label: "Travel",      icon: Plane,        cls: "bg-sky-100 text-sky-700" },
};

const DATA = [
  {
    cat: "Interacting with Others", color: "bg-rose-500",
    stems: [
      { fr: "Je t'invite à...", en: "I invite you to...", ex: [
        { c: "Friends", fr: "Je t'invite à mon anniversaire !", en: "I invite you to my birthday!" },
        { c: "Home", fr: "Je t'invite à regarder un film chez moi.", en: "I invite you to watch a movie at my house." },
        { c: "Playing", fr: "Je t'invite à faire du vélo dans le parc.", en: "I invite you to ride bikes in the park." },
      ]},
      { fr: "Je te présente...", en: "I introduce you to...", ex: [
        { c: "Friends", fr: "Je te présente ma copine Sarah.", en: "I introduce you to my friend Sarah." },
        { c: "School", fr: "Je te présente notre nouveau professeur de français.", en: "I introduce you to our new French teacher." },
        { c: "Home", fr: "Je te présente mon chat Minou.", en: "I introduce you to my cat Minou." },
      ]},
      { fr: "Je te prête...", en: "I lend you...", ex: [
        { c: "School", fr: "Je te prête ma règle pour le cours.", en: "I lend you my ruler for the class." },
        { c: "Playing", fr: "Je te prête mon ballon de foot.", en: "I lend you my football." },
        { c: "Library", fr: "Je te prête cette bande dessinée géniale.", en: "I lend you this awesome comic book." },
      ]},
      { fr: "Je te donne...", en: "I give you...", ex: [
        { c: "Supermarket", fr: "Je te donne un sac pour les pommes.", en: "I give you a bag for the apples." },
        { c: "Friends", fr: "Je te donne un morceau de mon gâteau.", en: "I give you a piece of my cake." },
        { c: "School", fr: "Je te donne ce joli autocollant.", en: "I give you this pretty sticker." },
      ]},
      { fr: "Est-ce que je peux... ?", en: "Can I... ? / May I... ?", ex: [
        { c: "School", fr: "Est-ce que je peux aller aux toilettes, s'il vous plaît ?", en: "Can I go to the toilet, please?" },
        { c: "Supermarket", fr: "Est-ce que je peux avoir un paquet de bonbons ?", en: "Can I have a packet of sweets?" },
        { c: "Friends", fr: "Est-ce que je peux jouer au ballon avec vous ?", en: "Can I play ball with you?" },
      ]},
      { fr: "Pouvez-vous m'aider à... ?", en: "Can you help me to... ?", ex: [
        { c: "Street", fr: "Pouvez-vous m'aider à trouver la boulangerie ?", en: "Can you help me find the bakery?" },
        { c: "Library", fr: "Pouvez-vous m'aider à chercher ce dictionnaire ?", en: "Can you help me look for this dictionary?" },
        { c: "School", fr: "Pouvez-vous m'aider à ramasser mes crayons ?", en: "Can you help me pick up my pencils?" },
      ]},
      { fr: "On pourrait...", en: "We could...", ex: [
        { c: "Playing", fr: "On pourrait faire un pique-nique au parc.", en: "We could have a picnic in the park." },
        { c: "Travel", fr: "On pourrait visiter le zoo ce week-end.", en: "We could visit the zoo this weekend." },
        { c: "Friends", fr: "On pourrait faire des crêpes chez toi.", en: "We could make pancakes at your house." },
      ]},
      { fr: "Si on... ?", en: "How about we... ?", ex: [
        { c: "Friends", fr: "Si on jouait à la poupée dans la chambre ?", en: "How about we played with dolls in the bedroom?" },
        { c: "Playing", fr: "Si on faisait une balade à vélo ?", en: "How about we went for a bike ride?" },
        { c: "Travel", fr: "Si on allait au bord de la mer en août ?", en: "How about we went to the seaside in August?" },
      ]},
      { fr: "Tu veux... ?", en: "Do you want to... ?", ex: [
        { c: "Friends", fr: "Tu veux écouter de la musique avec moi ?", en: "Do you want to listen to music with me?" },
        { c: "Supermarket", fr: "Tu veux m'accompagner faire les courses ?", en: "Do you want to accompany me to do the shopping?" },
        { c: "Street", fr: "Tu veux aller voir les chiens là-bas ?", en: "Do you want to go see the dogs over there?" },
      ]},
      { fr: "As-tu... ? / Avez-vous... ?", en: "Do you have... ?", ex: [
        { c: "Supermarket", fr: "Avez-vous du beurre frais, s'il vous plaît ?", en: "Do you have any fresh butter, please?" },
        { c: "School", fr: "As-tu une gomme dans ta trousse ?", en: "Do you have an eraser in your pencil case?" },
        { c: "Home", fr: "As-tu un animal domestique chez toi ?", en: "Do you have a pet at your house?" },
      ]},
      { fr: "Je te propose de...", en: "I suggest that you/we...", ex: [
        { c: "Friends", fr: "Je te propose de faire une randonnée en forêt.", en: "I suggest we go for a hike in the forest." },
        { c: "Playing", fr: "Je te propose de jouer à un jeu de société.", en: "I suggest we play a board game." },
        { c: "School", fr: "Je te propose de nettoyer le tableau de la classe.", en: "I suggest we clean the classroom blackboard." },
      ]},
      { fr: "Tu viens avec... ?", en: "Are you coming with... ?", ex: [
        { c: "Friends", fr: "Tu viens au cinéma avec moi et ma sœur ?", en: "Are you coming to the cinema with me and my sister?" },
        { c: "School", fr: "Tu viens à la cantine avec nous ce midi ?", en: "Are you coming to the cafeteria with us this lunchtime?" },
        { c: "Supermarket", fr: "Tu viens au marché acheter du poisson ?", en: "Are you coming to the market to buy fish?" },
      ]},
    ],
  },
  {
    cat: "Desires & Preferences", color: "bg-amber-500",
    stems: [
      { fr: "Je voudrais...", en: "I would like...", ex: [
        { c: "Supermarket", fr: "Je voudrais un pot de confiture de fraises.", en: "I would like a jar of strawberry jam." },
        { c: "Library", fr: "Je voudrais lire ce livre d'aventures.", en: "I would like to read this adventure book." },
        { c: "School", fr: "Je voudrais écrire sur le tableau blanc.", en: "I would like to write on the whiteboard." },
      ]},
      { fr: "J'aimerais...", en: "I would love to...", ex: [
        { c: "Playing", fr: "J'aimerais faire du poney pendant les vacances.", en: "I would love to ride a pony during the holidays." },
        { c: "Travel", fr: "J'aimerais voyager en avion jusqu'à Paris.", en: "I would love to travel by plane to Paris." },
        { c: "Friends", fr: "J'aimerais rencontrer mes correspondants chinois.", en: "I would love to meet my Chinese penpals." },
      ]},
      { fr: "Je veux...", en: "I want to...", ex: [
        { c: "Travel", fr: "Je veux aller à la piscine cet après-midi.", en: "I want to go to the swimming pool this afternoon." },
        { c: "Friends", fr: "Je veux prêter mon nouveau jouet à Thomas.", en: "I want to lend my new toy to Thomas." },
        { c: "Home", fr: "Je veux nourrir les lapins de notre jardin.", en: "I want to feed the rabbits in our garden." },
      ]},
      { fr: "Je ne veux pas...", en: "I do not want to...", ex: [
        { c: "Home", fr: "Je ne veux pas manger de légumes ce soir.", en: "I do not want to eat vegetables tonight." },
        { c: "School", fr: "Je ne veux pas rater l'autobus scolaire.", en: "I do not want to miss the school bus." },
        { c: "Friends", fr: "Je ne veux pas me disputer avec mes amis.", en: "I do not want to argue with my friends." },
      ]},
      { fr: "J'ai besoin de...", en: "I need...", ex: [
        { c: "Supermarket", fr: "J'ai besoin de farine pour faire le gâteau.", en: "I need flour to make the cake." },
        { c: "School", fr: "J'ai besoin d'un stylo bleu pour mes devoirs.", en: "I need a blue pen for my homework." },
        { c: "Home", fr: "J'ai besoin d'un balai pour nettoyer ma chambre.", en: "I need a broom to clean my room." },
      ]},
      { fr: "Il me faut...", en: "I need / It is necessary to have...", ex: [
        { c: "Supermarket", fr: "Il me faut une douzaine d'œufs pour la recette.", en: "I need a dozen eggs for the recipe." },
        { c: "School", fr: "Il me faut un nouveau cahier de dessin.", en: "I need a new drawing notebook." },
        { c: "Home", fr: "Il me faut de la pâte à sel pour fabriquer la toupie.", en: "I need salt dough to make the spinning top." },
      ]},
      { fr: "Je vais...", en: "I am going to...", ex: [
        { c: "Travel", fr: "Je vais visiter la grande cathédrale de Paris.", en: "I am going to visit the big cathedral of Paris." },
        { c: "Friends", fr: "Je vais retrouver mes copines à la patinoire.", en: "I am going to meet my friends at the ice rink." },
        { c: "School", fr: "Je vais écouter la maîtresse en silence.", en: "I am going to listen to the teacher in silence." },
      ]},
      { fr: "Je cherche...", en: "I am looking for...", ex: [
        { c: "Library", fr: "Je cherche un grand dictionnaire de français.", en: "I am looking for a big French dictionary." },
        { c: "Supermarket", fr: "Je cherche le rayon des produits laitiers.", en: "I am looking for the dairy products aisle." },
        { c: "Street", fr: "Je cherche l'arrêt de bus pour aller au centre-ville.", en: "I am looking for the bus stop to go downtown." },
      ]},
      { fr: "J'aime...", en: "I like...", ex: [
        { c: "School", fr: "J'aime faire des mathématiques avec mes copains.", en: "I like doing math with my classmates." },
        { c: "Playing", fr: "J'aime jouer de la guitare dans ma chambre.", en: "I like playing the guitar in my room." },
        { c: "Home", fr: "J'aime aider maman à arroser les fleurs.", en: "I like helping mom water the flowers." },
      ]},
      { fr: "J'adore...", en: "I love...", ex: [
        { c: "Playing", fr: "J'adore faire des châteaux de sable sur la plage.", en: "I love making sandcastles on the beach." },
        { c: "Travel", fr: "J'adore voyager dans le train rapide TGV.", en: "I love traveling on the fast train (TGV)." },
        { c: "Friends", fr: "J'adore rire avec mes camarades à la récré.", en: "I love laughing with my friends at recess." },
      ]},
      { fr: "Je n'aime pas...", en: "I don't like...", ex: [
        { c: "School", fr: "Je n'aime pas faire les examens d'histoire.", en: "I don't like doing history tests." },
        { c: "Friends", fr: "Je n'aime pas me disputer avec mes amis.", en: "I don't like arguing with my friends." },
        { c: "Travel", fr: "Je n'aime pas quand l'avion bouge beaucoup.", en: "I don't like when the plane moves a lot." },
      ]},
      { fr: "Je préfère...", en: "I prefer...", ex: [
        { c: "School", fr: "Je préfère les arts plastiques à la géographie.", en: "I prefer art class over geography." },
        { c: "Friends", fr: "Je préfère jouer au foot plutôt qu'aux billes.", en: "I prefer playing football rather than marbles." },
        { c: "Supermarket", fr: "Je préfère acheter des fraises au lieu des pommes.", en: "I prefer buying strawberries instead of apples." },
      ]},
    ],
  },
  {
    cat: "Rules & Abilities", color: "bg-sky-500",
    stems: [
      { fr: "Je dois...", en: "I must / have to...", ex: [
        { c: "School", fr: "Je dois lever la main avant de parler.", en: "I must raise my hand before speaking." },
        { c: "Home", fr: "Je dois faire mon lit tous les matins.", en: "I have to make my bed every morning." },
        { c: "Friends", fr: "Je dois dire au revoir à mes amis maintenant.", en: "I must say goodbye to my friends now." },
      ]},
      { fr: "Il faut...", en: "It is necessary to...", ex: [
        { c: "Supermarket", fr: "Il faut payer les bananes avant de partir.", en: "It is necessary to pay for the bananas before leaving." },
        { c: "School", fr: "Il faut ranger les crayons de couleur.", en: "It is necessary to put away the colored pencils." },
        { c: "Library", fr: "Il faut garder le silence dans la bibliothèque.", en: "It is necessary to keep silent in the library." },
      ]},
      { fr: "Il est interdit de...", en: "It is forbidden to...", ex: [
        { c: "School", fr: "Il est interdit de courir dans les couloirs.", en: "It is forbidden to run in the hallways." },
        { c: "Library", fr: "Il est interdit de manger des biscuits ici.", en: "It is forbidden to eat biscuits here." },
        { c: "Street", fr: "Il est interdit de jeter des déchets par terre.", en: "It is forbidden to throw trash on the ground." },
      ]},
      { fr: "On n'a pas le droit de...", en: "We are not allowed to...", ex: [
        { c: "School", fr: "On n'a pas le droit d'utiliser l'ordinateur en récré.", en: "We are not allowed to use the computer during recess." },
        { c: "Friends", fr: "On n'a pas le droit de se battre dans la cour.", en: "We are not allowed to fight in the yard." },
        { c: "Home", fr: "On n'a pas le droit de porter du maquillage à l'école.", en: "We are not allowed to wear makeup to school." },
      ]},
      { fr: "Je sais...", en: "I know how to...", ex: [
        { c: "Playing", fr: "Je sais nager très bien dans la piscine.", en: "I know how to swim very well in the pool." },
        { c: "School", fr: "Je sais réciter l'alphabet français par cœur.", en: "I know how to recite the French alphabet by heart." },
        { c: "Home", fr: "Je sais faire des crêpes de sorcier délicieuses.", en: "I know how to make delicious wizard pancakes." },
      ]},
      { fr: "Je ne sais pas...", en: "I don't know...", ex: [
        { c: "School", fr: "Je ne sais pas faire cet exercice difficile.", en: "I don't know how to do this difficult exercise." },
        { c: "Friends", fr: "Je ne sais pas où habitent mes camarades.", en: "I don't know where my friends live." },
        { c: "Street", fr: "Je ne sais pas comment aller à l'hôpital de ville.", en: "I don't know how to get to the city hospital." },
      ]},
      { fr: "Je peux...", en: "I can / am able to...", ex: [
        { c: "School", fr: "Je peux effacer le tableau blanc aujourd'hui.", en: "I can erase the whiteboard today." },
        { c: "Friends", fr: "Je peux te prêter mon livre si tu veux.", en: "I can lend you my book if you want." },
        { c: "Home", fr: "Je peux couper la pelouse avec papa ce matin.", en: "I can cut the lawn with dad this morning." },
      ]},
      { fr: "Je ne peux pas...", en: "I cannot...", ex: [
        { c: "School", fr: "Je ne peux pas venir en classe verte demain.", en: "I cannot come to the green camp class tomorrow." },
        { c: "Friends", fr: "Je ne peux pas sortir jouer ce soir.", en: "I cannot go out to play tonight." },
        { c: "Supermarket", fr: "Je ne peux pas acheter ce gâteau, c'est trop cher !", en: "I cannot buy this cake, it's too expensive!" },
      ]},
      { fr: "Je suis d'accord pour...", en: "I agree to...", ex: [
        { c: "Friends", fr: "Je suis d'accord pour jouer au tennis dans le parc.", en: "I agree to play tennis in the park." },
        { c: "School", fr: "Je suis d'accord pour aider le maître de dessin.", en: "I agree to help the art teacher." },
        { c: "Home", fr: "Je suis d'accord pour laver la voiture blanche de maman.", en: "I agree to wash mom's white car." },
      ]},
      { fr: "Je refuse de...", en: "I refuse to...", ex: [
        { c: "Home", fr: "Je refuse de ranger la chambre de mon frère.", en: "I refuse to tidy my brother's bedroom." },
        { c: "School", fr: "Je refuse de prêter ma calculatrice à un élève impoli.", en: "I refuse to lend my calculator to an impolite student." },
        { c: "Friends", fr: "Je refuse de tricher au jeu de société.", en: "I refuse to cheat in the board game." },
      ]},
      { fr: "On doit...", en: "We must...", ex: [
        { c: "School", fr: "On doit porter un pull bleu foncé au collège.", en: "We must wear a dark blue sweater at school." },
        { c: "Home", fr: "On doit faire la vaisselle après le petit-déjeuner.", en: "We must do the dishes after breakfast." },
        { c: "Travel", fr: "On doit acheter des billets avant de monter dans le train.", en: "We must buy tickets before getting on the train." },
      ]},
      { fr: "On peut...", en: "We can...", ex: [
        { c: "Playing", fr: "On peut faire du kayak sur la rivière calme.", en: "We can go kayaking on the calm river." },
        { c: "Home", fr: "On peut cacher les bonbons dans le placard.", en: "We can hide the candies in the cupboard." },
        { c: "Library", fr: "On peut emprunter quatre livres de contes de fées.", en: "We can borrow four fairy tale books." },
      ]},
    ],
  },
  {
    cat: "Daily Routine & Hobbies", color: "bg-violet-500",
    stems: [
      { fr: "Je me réveille à...", en: "I wake up at...", ex: [
        { c: "Home", fr: "Je me réveille à sept heures du matin.", en: "I wake up at seven o'clock in the morning." },
        { c: "School", fr: "Je me réveille à six heures et demie le lundi.", en: "I wake up at half past six on Mondays." },
        { c: "Travel", fr: "Je me réveille à cinq heures pour aller à l'aéroport.", en: "I wake up at five o'clock to go to the airport." },
      ]},
      { fr: "Je me lève à...", en: "I get up at...", ex: [
        { c: "Home", fr: "Je me lève à sept heures dix tous les matins.", en: "I get up at ten past seven every morning." },
        { c: "School", fr: "Je me lève à sept heures pour réviser le dictionnaire.", en: "I get up at seven o'clock to review the dictionary." },
        { c: "Friends", fr: "Je me lève tard le samedi pour la grasse matinée.", en: "I get up late on Saturdays for a lie-in." },
      ]},
      { fr: "Je me lave...", en: "I wash myself...", ex: [
        { c: "Home", fr: "Je me lave dans la salle de bains verte.", en: "I wash myself in the green bathroom." },
        { c: "Playing", fr: "Je me lave les mains après avoir joué au ballon.", en: "I wash my hands after playing ball." },
        { c: "School", fr: "Je me lave les mains avant d'entrer à la cantine.", en: "I wash my hands before entering the cafeteria." },
      ]},
      { fr: "Je m'habille...", en: "I get dressed...", ex: [
        { c: "Home", fr: "Je m'habille dans ma chambre sous le miroir.", en: "I get dressed in my bedroom under the mirror." },
        { c: "School", fr: "Je m'habille chaudement pour aller à l'école.", en: "I get dressed warmly to go to school." },
        { c: "Friends", fr: "Je m'habille en super-héros avec mes copains.", en: "I dress up as a superhero with my friends." },
      ]},
      { fr: "Je déjeune...", en: "I eat breakfast...", ex: [
        { c: "Home", fr: "Je déjeune avec maman dans la grande cuisine.", en: "I eat breakfast with mom in the big kitchen." },
        { c: "School", fr: "Je déjeune d'une pomme et d'un bol de céréales.", en: "I eat a breakfast of an apple and a bowl of cereal." },
        { c: "Travel", fr: "Je déjeune à l'hôtel d'un délicieux croissant chaud.", en: "I eat breakfast at the hotel with a delicious hot croissant." },
      ]},
      { fr: "Je joue à...", en: "I play [sport/game]...", ex: [
        { c: "Playing", fr: "Je joue à cache-cache avec mon petit frère.", en: "I play hide-and-seek with my little brother." },
        { c: "Friends", fr: "Je joue à des jeux vidéo avec mes copains.", en: "I play video games with my friends." },
        { c: "School", fr: "Je joue au basket dans le terrain de sport.", en: "I play basketball on the sports field." },
      ]},
      { fr: "Je joue de...", en: "I play [instrument]...", ex: [
        { c: "Home", fr: "Je joue du piano dans le salon de mes grands-parents.", en: "I play the piano in my grandparents' living room." },
        { c: "Friends", fr: "Je joue de la flûte dans le groupe de mes copains.", en: "I play the flute in my friends' band." },
        { c: "School", fr: "Je joue du piano pendant la fête de l'école.", en: "I play the piano during the school festival." },
      ]},
      { fr: "Je fais de la... / du...", en: "I do/play [activity]...", ex: [
        { c: "Playing", fr: "Je fais de la natation à la piscine du quartier.", en: "I go swimming at the neighborhood pool." },
        { c: "Friends", fr: "Je fais du jogging avec ma copine le samedi.", en: "I go jogging with my friend on Saturdays." },
        { c: "School", fr: "Je fais de la gymnastique le jeudi après-midi.", en: "I do gymnastics on Thursday afternoons." },
      ]},
      { fr: "Je me couche à...", en: "I go to bed at...", ex: [
        { c: "Home", fr: "Je me couche à neuf heures dans mon lit chaud.", en: "I go to bed at nine o'clock in my warm bed." },
        { c: "School", fr: "Je me couche tôt avant le grand examen d'histoire.", en: "I go to bed early before the big history test." },
        { c: "Friends", fr: "Je me couche tard quand je dors chez ma copine.", en: "I go to bed late when I sleep at my friend's house." },
      ]},
      { fr: "J'ai l'habitude de...", en: "I am used to...", ex: [
        { c: "Home", fr: "J'ai l'habitude d'écouter une histoire de sorcier.", en: "I am used to listening to a wizard story." },
        { c: "School", fr: "J'ai l'habitude d'arriver en classe avant huit heures.", en: "I am used to arriving in class before eight o'clock." },
        { c: "Friends", fr: "J'ai l'habitude de partager mon goûter avec Sarah.", en: "I am used to sharing my afternoon snack with Sarah." },
      ]},
      { fr: "Je m'intéresse à...", en: "I am interested in...", ex: [
        { c: "School", fr: "Je m'intéresse aux cours de sciences naturelles.", en: "I am interested in natural science classes." },
        { c: "Library", fr: "Je m'intéresse aux contes et légendes historiques.", en: "I am interested in historical tales and legends." },
        { c: "Friends", fr: "Je m'intéresse au club de théâtre de mes amies.", en: "I am interested in my friends' theater club." },
      ]},
      { fr: "Je m'entends bien avec...", en: "I get on well with...", ex: [
        { c: "Home", fr: "Je m'entends bien avec ma sœur cadette.", en: "I get on well with my younger sister." },
        { c: "School", fr: "Je m'entends bien avec mon instituteur de français.", en: "I get on well with my French primary school teacher." },
        { c: "Friends", fr: "Je m'entends bien avec tous mes correspondants de classe.", en: "I get on well with all my classroom penpals." },
      ]},
    ],
  },
  {
    cat: "Location & Travel", color: "bg-teal-500",
    stems: [
      { fr: "Où est... ? / Où sont... ?", en: "Where is / are... ?", ex: [
        { c: "Supermarket", fr: "Où est le distributeur de billets, s'il vous plaît ?", en: "Where is the cash machine, please?" },
        { c: "School", fr: "Où sont mes crayons de couleur rouge et bleu ?", en: "Where are my red and blue colored pencils?" },
        { c: "Travel", fr: "Où est l'hôtel Bellevue dans cette grande ville ?", en: "Where is the Bellevue Hotel in this big city?" },
      ]},
      { fr: "Je vais à...", en: "I am going to...", ex: [
        { c: "School", fr: "Je vais à l'école primaire du centre-ville à pied.", en: "I am going to the downtown primary school on foot." },
        { c: "Supermarket", fr: "Je vais à la boulangerie acheter un croissant chaud.", en: "I am going to the bakery to buy a hot croissant." },
        { c: "Travel", fr: "Je vais à l'aéroport Charles-de-Gaulle en bus.", en: "I am going to Charles-de-Gaulle airport by bus." },
      ]},
      { fr: "Est-ce qu'il y a... ?", en: "Is / Are there... ?", ex: [
        { c: "Supermarket", fr: "Est-ce qu'il y a un marché aux fruits près d'ici ?", en: "Is there a fruit market near here?" },
        { c: "School", fr: "Est-ce qu'il y a une classe d'informatique dans l'école ?", en: "Is there a computer class in the school?" },
        { c: "Home", fr: "Est-ce qu'il y a une grande piscine partagée ?", en: "Is there a big shared swimming pool?" },
      ]},
      { fr: "Prenez le... / Prenez la...", en: "Take the...", ex: [
        { c: "Street", fr: "Prenez la deuxième rue à gauche après le feu.", en: "Take the second street on the left after the traffic lights." },
        { c: "School", fr: "Prenez le bus scolaire devant le grand portail.", en: "Take the school bus in front of the big gate." },
        { c: "Travel", fr: "Prenez le train régional RER pour aller plus vite.", en: "Take the regional express train (RER) to go faster." },
      ]},
      { fr: "Tournez à...", en: "Turn...", ex: [
        { c: "Street", fr: "Tournez à droite en sortant de la boulangerie.", en: "Turn right when leaving the bakery." },
        { c: "School", fr: "Tournez à gauche pour aller vers la salle des profs.", en: "Turn left to go towards the staff room." },
        { c: "Travel", fr: "Tournez à droite après la station de métro, s'il vous plaît.", en: "Turn right after the metro station, please." },
      ]},
      { fr: "Allez tout droit vers...", en: "Go straight towards...", ex: [
        { c: "Street", fr: "Allez tout droit vers le grand centre commercial.", en: "Go straight ahead towards the big shopping center." },
        { c: "School", fr: "Allez tout droit vers le gymnase de sport.", en: "Go straight ahead towards the sports gym." },
        { c: "Travel", fr: "Allez tout droit vers la porte d'embarquement A.", en: "Go straight ahead towards boarding gate A." },
      ]},
      { fr: "Je viens de...", en: "I have just... / I come from...", ex: [
        { c: "Travel", fr: "Je viens de Manchester en Angleterre en TGV.", en: "I come from Manchester in England by fast train." },
        { c: "Home", fr: "Je viens de me réveiller, je suis fatiguée.", en: "I have just woken up, I am tired." },
        { c: "Friends", fr: "Je viens de manger une bonne pizza avec mes amis.", en: "I have just eaten a nice pizza with my friends." },
      ]},
      { fr: "Ça coûte...", en: "It costs...", ex: [
        { c: "Supermarket", fr: "Ça coûte dix euros le kilo de tomates.", en: "It costs ten euros for a kilo of tomatoes." },
        { c: "School", fr: "La trousse rouge ? Ça coûte trop cher pour moi !", en: "The red pencil case? It costs too much for me!" },
        { c: "Friends", fr: "Ce beau ballon de foot coûte quinze euros.", en: "This beautiful football costs fifteen euros." },
      ]},
      { fr: "Pourquoi tu... ?", en: "Why do you... ?", ex: [
        { c: "Supermarket", fr: "Pourquoi tu vas au supermarché de la rue ?", en: "Why are you going to the street supermarket?" },
        { c: "School", fr: "Pourquoi tu as une mauvaise note en mathématiques ?", en: "Why do you have a bad grade in mathematics?" },
        { c: "Friends", fr: "Pourquoi tu pleures devant tes copines ?", en: "Why are you crying in front of your friends?" },
      ]},
      { fr: "Parce que...", en: "Because...", ex: [
        { c: "Supermarket", fr: "Parce que je veux acheter du lait pour le gâteau.", en: "Because I want to buy milk for the cake." },
        { c: "School", fr: "Parce que l'explication va trop vite pour moi.", en: "Because the explanation is going too fast for me." },
        { c: "Friends", fr: "Parce que j'adore faire de la balade en vélo.", en: "Because I love going for a bike ride." },
      ]},
      { fr: "Quand est-ce que... ?", en: "When does... ?", ex: [
        { c: "Travel", fr: "Quand est-ce que le train pour Lyon part, s'il vous plaît ?", en: "When does the train to Lyon leave, please?" },
        { c: "School", fr: "Quand est-ce que les grandes vacances scolaires commencent ?", en: "When do the big school holidays start?" },
        { c: "Friends", fr: "Quand est-ce que tu viens jouer avec nous au parc ?", en: "When are you coming to play with us in the park?" },
      ]},
      { fr: "Ça dépend de...", en: "It depends on...", ex: [
        { c: "Travel", fr: "On va à la plage ? Ça dépend du temps qu'il fait.", en: "We're going to the beach? It depends on the weather." },
        { c: "School", fr: "Mes notes ? Ça dépend de la difficulté de l'examen.", en: "My grades? It depends on the difficulty of the exam." },
        { c: "Friends", fr: "Mon activité du samedi dépend de mes copines.", en: "My Saturday activity depends on my friends." },
      ]},
    ],
  },
  {
    cat: "Feelings & Physical States", color: "bg-pink-500",
    stems: [
      { fr: "Je suis...", en: "I am...", ex: [
        { c: "School", fr: "Je suis heureuse d'aller à la classe verte !", en: "I am happy to go to the green camp class!" },
        { c: "Friends", fr: "Je suis très contente de recevoir de tes nouvelles.", en: "I am very pleased to hear from you." },
        { c: "Home", fr: "Je suis fatiguée après avoir fait le ménage.", en: "I am tired after doing the housework." },
      ]},
      { fr: "J'ai...", en: "I am... (hungry, thirsty, etc.)", ex: [
        { c: "Supermarket", fr: "J'ai très faim, achetons un croissant chaud !", en: "I am very hungry, let's buy a hot croissant!" },
        { c: "Playing", fr: "J'ai chaud après avoir couru dans tout le jardin.", en: "I am hot after running all over the garden." },
        { c: "Friends", fr: "T'as soif après le long match de foot ?", en: "Are you thirsty after the long football match?" },
      ]},
      { fr: "J'ai mal à...", en: "My ... hurts", ex: [
        { c: "Home", fr: "J'ai très mal au ventre aujourd'hui.", en: "I have a bad tummy ache today." },
        { c: "School", fr: "J'ai mal à la tête à cause de la leçon de maths.", en: "I have a headache because of the math lesson." },
        { c: "Friends", fr: "J'ai mal au dos après avoir joué au basket.", en: "My back hurts after playing basketball." },
      ]},
      { fr: "Je me sens...", en: "I feel...", ex: [
        { c: "School", fr: "Je me sens fantastique le jour de la rentrée !", en: "I feel fantastic on the first day of school!" },
        { c: "Friends", fr: "Je me sens un peu exclue de notre jeu.", en: "I feel a bit excluded from our game." },
        { c: "Home", fr: "Je ne me sens pas bien du tout aujourd'hui.", en: "I do not feel well at all today." },
      ]},
      { fr: "J'ai peur de...", en: "I am afraid of...", ex: [
        { c: "Home", fr: "J'ai peur du fantôme horrible dans le placard.", en: "I am afraid of the horrible ghost in the closet." },
        { c: "Street", fr: "J'ai peur des gros chiens dans la rue.", en: "I am afraid of the big dogs in the street." },
        { c: "School", fr: "J'ai peur de devoir redoubler ma classe de français.", en: "I am afraid of having to repeat my French class." },
      ]},
      { fr: "J'ai hâte de...", en: "I can't wait to...", ex: [
        { c: "School", fr: "J'ai hâte de revoir mes copains de classe lundi.", en: "I can't wait to see my school friends again on Monday." },
        { c: "Friends", fr: "J'ai hâte de célébrer mon anniversaire avec toi.", en: "I can't wait to celebrate my birthday with you." },
        { c: "Travel", fr: "J'ai hâte de monter dans l'avion pour la Réunion.", en: "I can't wait to get on the plane to Reunion Island." },
      ]},
      { fr: "Je suis fier / fière de...", en: "I am proud of...", ex: [
        { c: "School", fr: "Je suis fière de mon joli projet de dessin.", en: "I am proud of my pretty drawing project." },
        { c: "Friends", fr: "Je suis fier de mon score au jeu de tennis.", en: "I am proud of my score in the tennis game." },
        { c: "Home", fr: "Je suis fière de mon frère qui fait du vélo.", en: "I am proud of my brother who is riding a bike." },
      ]},
      { fr: "Ça me gêne de...", en: "It bothers me to...", ex: [
        { c: "School", fr: "Ça me gêne de chanter devant toute la classe.", en: "It bothers me to sing in front of the whole class." },
        { c: "Friends", fr: "Ça me gêne de courir avec mes chaussures neuves.", en: "It bothers me to run in my new shoes." },
        { c: "Home", fr: "Ça me gêne de faire mes devoirs dans le bruit.", en: "It bothers me to do my homework in the noise." },
      ]},
      { fr: "Comment ça va... ?", en: "How is... going?", ex: [
        { c: "Friends", fr: "Comment ça va aujourd'hui, ma petite copine ?", en: "How are you today, my little friend?" },
        { c: "School", fr: "Comment ça va à l'école avec ton nouveau maître ?", en: "How is school going with your new teacher?" },
        { c: "Home", fr: "Comment ça va avec les animaux de ta ferme ?", en: "How is it going with the animals on your farm?" },
      ]},
      { fr: "Qu'est-ce que tu penses de... ?", en: "What do you think of... ?", ex: [
        { c: "School", fr: "Qu'est-ce que tu penses de l'uniforme scolaire rouge ?", en: "What do you think of the red school uniform?" },
        { c: "Friends", fr: "Qu'est-ce que tu penses de mon nouveau vélo bleu ?", en: "What do you think of my new blue bike?" },
        { c: "Library", fr: "Qu'est-ce que tu penses de cette histoire de fée ?", en: "What do you think of this fairy story?" },
      ]},
    ],
  },
];

function ContextBadge({ c }) {
  const cfg = CTX[c] || { label: c, icon: MapPin, cls: "bg-slate-100 text-slate-600" };
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${cfg.cls}`}>
      <Icon size={12} /> {cfg.label}
    </span>
  );
}

export default function FrenchLearningApp() {
  const [mode, setMode] = useState("learn");
  const [catIndex, setCatIndex] = useState(0);
  const [rate, setRate] = useState(0.7);
  const [voices, setVoices] = useState([]);
  const [voiceURI, setVoiceURI] = useState("");

  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showFrench, setShowFrench] = useState(false);

  useEffect(() => {
    function loadVoices() {
      const all = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
      const fr = all.filter((v) => v.lang && v.lang.toLowerCase().startsWith("fr"));
      setVoices(fr.length ? fr : all);
      if (fr.length && !voiceURI) setVoiceURI(fr[0].voiceURI);
    }
    loadVoices();
    if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  async function speak(text) {
    const clean = text.replace(/\.\.\./g, "").trim();
    if (!clean) return;
    try {
      const res = await fetch("/api/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: clean }),
      });
      if (!res.ok) throw new Error("TTS failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.playbackRate = rate < 0.5 ? 0.5 : rate;
      audio.play();
      audio.onended = () => URL.revokeObjectURL(url);
    } catch (e) {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(clean);
      u.lang = "fr-FR";
      u.rate = rate;
      const v = voices.find((x) => x.voiceURI === voiceURI);
      if (v) u.voice = v;
      window.speechSynthesis.speak(u);
    }
  }

  const cat = DATA[catIndex];
  const allCards = useMemo(
    () => DATA.flatMap((c) => c.stems.map((s) => ({ ...s, cat: c.cat, color: c.color }))),
    []
  );
  const card = allCards[cardIndex];

  function nextCard() { setFlipped(false); setCardIndex((i) => (i + 1) % allCards.length); }
  function prevCard() { setFlipped(false); setCardIndex((i) => (i - 1 + allCards.length) % allCards.length); }
  function randomCard() { setFlipped(false); setCardIndex(Math.floor(Math.random() * allCards.length)); }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇫🇷</span>
            <h1 className="text-lg font-bold">Ma Petite Française</h1>
          </div>
          <div className="flex gap-1 bg-slate-100 rounded-full p-1">
            <button onClick={() => setMode("learn")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition ${mode === "learn" ? "bg-white shadow text-rose-600" : "text-slate-500"}`}>
              <BookOpen size={16} /> Learn
            </button>
            <button onClick={() => setMode("flip")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition ${mode === "flip" ? "bg-white shadow text-rose-600" : "text-slate-500"}`}>
              <Layers size={16} /> Cards
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 pt-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="flex items-center gap-2 flex-1">
            <Gauge size={18} className="text-slate-400 shrink-0" />
            <span className="text-sm text-slate-500 w-20 shrink-0">Speed {rate.toFixed(1)}x</span>
            <input type="range" min="0.4" max="1" step="0.1" value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))} className="w-full accent-rose-500" />
          </div>
          <div className="flex items-center gap-2 flex-1">
            <Volume2 size={18} className="text-slate-400 shrink-0" />
            <select value={voiceURI} onChange={(e) => setVoiceURI(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-2 py-1.5 w-full bg-white">
              {voices.length === 0 && <option>Loading voices...</option>}
              {voices.map((v) => (<option key={v.voiceURI} value={v.voiceURI}>{v.name}</option>))}
            </select>
          </div>
        </div>
      </div>

      {mode === "learn" && (
        <main className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1">
            {DATA.map((c, i) => (
              <button key={i} onClick={() => setCatIndex(i)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition ${i === catIndex ? `${c.color} text-white` : "bg-white text-slate-500 border border-slate-200"}`}>
                {c.cat}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {cat.stems.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className={`flex items-start justify-between gap-3 p-4 ${cat.color} bg-opacity-10`}>
                  <div className="min-w-0">
                    <p className="text-xl font-bold text-slate-800">{s.fr}</p>
                    <p className="text-sm text-slate-500">{s.en}</p>
                  </div>
                  <button onClick={() => speak(s.fr)}
                    className={`shrink-0 w-11 h-11 rounded-full ${cat.color} text-white flex items-center justify-center active:scale-95 transition`}>
                    <Volume2 size={20} />
                  </button>
                </div>
                <div className="divide-y divide-slate-100">
                  {s.ex.map((ex, j) => (
                    <div key={j} className="flex items-start gap-3 p-4">
                      <button onClick={() => speak(ex.fr)}
                        className="shrink-0 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center active:scale-95 transition">
                        <Volume2 size={16} />
                      </button>
                      <div className="min-w-0">
                        <ContextBadge c={ex.c} />
                        <p className="font-semibold text-slate-800 mt-1">{ex.fr}</p>
                        <p className="text-sm text-slate-400">{ex.en}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {mode === "flip" && (
        <main className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-slate-500">Card {cardIndex + 1} / {allCards.length}</span>
            <button onClick={() => setShowFrench((v) => !v)}
              className="text-sm font-medium text-rose-600 bg-rose-50 px-3 py-1.5 rounded-full">
              {showFrench ? "FR → guess EN" : "EN → guess FR"}
            </button>
          </div>

          <div onClick={() => setFlipped((f) => !f)}
            className="relative bg-white rounded-3xl border-2 border-slate-200 min-h-64 flex flex-col items-center justify-center cursor-pointer select-none px-6 py-8 text-center shadow-sm">
            <span className={`absolute top-4 left-4 text-xs px-2 py-1 rounded-full text-white ${card.color}`}>{card.cat}</span>
            {!flipped ? (
              <>
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">{showFrench ? "French" : "English"}</p>
                <p className="text-2xl font-bold">{showFrench ? card.fr : card.en}</p>
                <p className="text-xs text-slate-400 mt-4">👆 tap to reveal</p>
              </>
            ) : (
              <>
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">{showFrench ? "English" : "French"}</p>
                <p className="text-2xl font-bold">{showFrench ? card.en : card.fr}</p>
                <div className="mt-4 w-full max-w-sm space-y-2">
                  {card.ex.map((ex, j) => (
                    <div key={j} className="flex items-center gap-2 bg-slate-50 rounded-xl p-2 text-left">
                      <button onClick={(e) => { e.stopPropagation(); speak(ex.fr); }}
                        className="shrink-0 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                        <Volume2 size={14} />
                      </button>
                      <p className="text-sm text-slate-700">{ex.fr}</p>
                    </div>
                  ))}
                </div>
                <button onClick={(e) => { e.stopPropagation(); speak(card.fr); }}
                  className={`mt-4 flex items-center gap-2 ${card.color} text-white px-4 py-2 rounded-full text-sm`}>
                  <Volume2 size={16} /> Say the stem
                </button>
              </>
            )}
          </div>

          <div className="flex items-center justify-center gap-3 mt-6">
            <button onClick={prevCard} className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center active:scale-95"><ChevronLeft /></button>
            <button onClick={() => setFlipped((f) => !f)} className="w-14 h-14 rounded-full bg-slate-800 text-white flex items-center justify-center active:scale-95"><RotateCcw size={22} /></button>
            <button onClick={randomCard} className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center active:scale-95"><Shuffle size={20} /></button>
            <button onClick={nextCard} className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center active:scale-95"><ChevronRight /></button>
          </div>
        </main>
      )}

      <footer className="text-center text-xs text-slate-400 py-6">
        Prototype · browser voice for now · ElevenLabs after deploy
      </footer>
    </div>
  );
}
