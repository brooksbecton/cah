(this["webpackJsonpcah-client"]=this["webpackJsonpcah-client"]||[]).push([[0],{128:function(e,t,n){e.exports=n(276)},273:function(e,t){},276:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(12),o=n.n(r),c=n(9),l=n(26),s=n(20),d=n(8),u=n(5),h=n.n(u),p=n(7),g=n(14);function m(){var e=Object(c.a)(["\n  width: 100%;\n  max-width: 232px;\n  border-color: transparent;\n  border-radius: 20px;\n  padding: 5px;\n  font-size: 18px;\n  background-color: ",";\n  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.16);\n"]);return m=function(){return e},e}function f(){var e=Object(c.a)(["\n  width: 100%;\n  max-width: 212px;\n  border-radius: 5px;\n  padding: 5px;\n  font-size: 18px;\n  border-color: transparent;\n  background-color: ",";\n  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.16);\n  padding-left: 13px;\n  padding-bottom: 9px;\n  padding-top: 9px;\n\n  -webkit-inner-spin-button {\n    border: none; \n  }\n"]);return f=function(){return e},e}var b=d.c.input(f(),(function(e){return e.theme.colors.white})),y=d.c.button(m(),(function(e){return e.theme.colors.white})),v=n(55),k=n.n(v),x="https://cah-mobile.herokuapp.com/";function w(e){return new Promise(function(){var t=Object(p.a)(h.a.mark((function t(n,a){return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:k.a.post("".concat(x,"/games/default/create")).send({numPlayers:e}).end((function(e,t){var i=t.body;e?a(e):n(i.gameID)}));case 1:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}())}function C(){var e=Object(c.a)(["\n  display: flex;\n  flex: 1;\n  align-items: center;\n  flex-direction: column;\n  justify-content: space-around;\n"]);return C=function(){return e},e}function A(){var e=Object(c.a)(["\n  background-color: ",";\n  display: flex;\n  flex-direction: column;\n  height: calc(100% - 40px);\n  text-align: center;\n  padding: 20px;\n"]);return A=function(){return e},e}function I(){var e=Object(c.a)(["\n  flex: 3;\n"]);return I=function(){return e},e}var S=function(){var e=Object(a.useState)(2),t=Object(g.a)(e,2),n=t[0],r=t[1],o=Object(s.e)(),c=function(){var e=Object(p.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w(n);case 2:t=e.sent,o.push("/join/".concat(t&&"".concat(t,"/")));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return i.a.createElement(E,null,i.a.createElement(T,null,"Cards Against Humanity"),i.a.createElement(O,null,i.a.createElement(b,{id:"numPlayers",type:"number",placeholder:"Number of Players",onChange:function(e){r(Number(e.target.value))},value:n}),i.a.createElement(y,{"data-test-id":"createGameButton",onClick:c},"Create Game"),i.a.createElement(y,{"data-test-id":"NavigateToJoin",onClick:function(){return o.push("/join")}},"Join Game")))},T=d.c.h1(I()),E=d.c.div(A(),(function(e){return e.theme.whiteCard.bg})),O=d.c.div(C());function j(){var e=Object(c.a)(["\n  display: flex;\n  flex: 1;\n  align-items: center;\n  flex-direction: column;\n  justify-content: space-around;\n"]);return j=function(){return e},e}function W(){var e=Object(c.a)(["\n  background-color: ",";\n  display: flex;\n  flex-direction: column;\n  height: calc(100% - 40px);\n  text-align: center;\n  padding: 20px;\n"]);return W=function(){return e},e}function D(){var e=Object(c.a)(["\n  flex: 3;\n"]);return D=function(){return e},e}var P=function(){var e=Object(s.e)(),t=Object(s.f)(),n=Object(a.useState)(t.params.gameId),r=Object(g.a)(n,2),o=r[0],c=r[1],l=Object(a.useState)(""),d=Object(g.a)(l,2),u=d[0],m=d[1],f=Object(a.useState)(!1),v=Object(g.a)(f,2),w=v[0],C=v[1];Object(a.useEffect)((function(){!0===w&&new Promise(function(){var e=Object(p.a)(h.a.mark((function e(t,n){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:k.a.get("".concat(x,"/games/default")).send().end((function(e,a){var i=a.body;e?n(e):t(i.rooms)}));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()).then((function(t){var n=t.find((function(e){return e.gameID===o})),a=null===n||void 0===n?void 0:n.players.find((function(e){return void 0===e.name}));a?function(e){var t=e.gameId,n=e.playerId,a=e.playerName;return new Promise(function(){var e=Object(p.a)(h.a.mark((function e(i,r){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:k.a.post("".concat(x,"/games/default/").concat(t,"/join")).send({playerID:n,playerName:a}).end((function(e,t){var n=t.body;e?r(e):i(n.playerCredentials)}));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}())}({gameId:o,playerId:String(a.id),playerName:u}).then((function(t){e.push("/game/".concat(o,"/").concat(t,"/").concat(a.id)),C(!1)})):C(!1)}))}),[w,o,e,u]);return i.a.createElement(_,null,i.a.createElement(M,null,"Join Game"),i.a.createElement(B,null,i.a.createElement(b,{placeholder:"Game ID",id:"gameId","data-test-id":"gameId",type:"text",onChange:function(e){c(e.target.value)},value:o}),i.a.createElement(b,{placeholder:"Player Name","data-test-id":"playerName",type:"text",onChange:function(e){m(e.target.value)},value:u}),i.a.createElement(y,{"data-test-id":"joinGame",disabled:!(o&&u),onClick:function(){C(!0)}},"Join Game")))},M=d.c.h1(D()),_=d.c.div(W(),(function(e){return e.theme.whiteCard.bg})),B=d.c.div(j()),F=n(122),H=(n(82),n(56)),N=n(3),G={Base:{black:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89],name:"Base Set",white:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,438,439,440,441,442,443,444,445,446,447,448,449,450,451,452,453,454,455,456,457,458,459]},blackCards:[{text:"Why can't I sleep at night?",pick:1},{text:"I got 99 problems but _ ain't one.",pick:1},{text:"What's a girl's best friend?",pick:1},{text:"What's that smell?",pick:1},{text:"This is the way the world ends / This is the way the world ends / Not with a bang but with _.",pick:1},{text:"What is Batman's guilty pleasure?",pick:1},{text:"TSA guidelines now prohibit _ on airplanes.",pick:1},{text:"What ended my last relationship?",pick:1},{text:"MTV's new reality show features eight washed-up celebrities living with _.",pick:1},{text:"I drink to forget _.",pick:1},{text:"I'm sorry, Professor, but I couldn't complete my homework because of _.",pick:1},{text:"Alternative medicine is now embracing the curative powers of _.",pick:1},{text:"What's that sound?",pick:1},{text:"What's the next Happy Meal&reg; toy?",pick:1},{text:"It's a pity that kids these days are all getting involved with _.",pick:1},{text:"In the new Disney Channel Original Movie, Hannah Montana struggles with _ for the first time.",pick:1},{text:"_. That's how I want to die.",pick:1},{text:"What does Dick Cheney prefer?",pick:1},{text:"What's the most emo?",pick:1},{text:"Instead of coal, Santa now gives the bad children _.",pick:1},{text:"Next from J.K. Rowling: Harry Potter and the Chamber of _.",pick:1},{text:"A romantic, candlelit dinner would be incomplete without _.",pick:1},{text:"White people like _.",pick:1},{text:"_. Betcha can't have just one!",pick:1},{text:"War!<br><br>What is it good for?",pick:1},{text:"BILLY MAYS HERE FOR _.",pick:1},{text:"_. High five, bro.",pick:1},{text:"During sex, I like to think about _.",pick:1},{text:"What did I bring back from Mexico?",pick:1},{text:"What are my parents hiding from me?",pick:1},{text:"What will always get you laid?",pick:1},{text:"What would grandma find disturbing, yet oddly charming?",pick:1},{text:"What did the U.S. airdrop to the children of Afghanistan?",pick:1},{text:"What helps Obama unwind?",pick:1},{text:"What's there a ton of in heaven?",pick:1},{text:"Major League Baseball has banned _ for giving players an unfair advantage.",pick:1},{text:"When I am a billionaire, I shall erect a 50-foot statue to commemorate _.",pick:1},{text:"What's the new fad diet?",pick:1},{text:"When I am the President of the United States, I will create the Department of _.",pick:1},{text:"_. It's a trap!",pick:1},{text:"How am I maintaining my relationship status?",pick:1},{text:"What will I bring back in time to convince people that I am a powerful wizard?",pick:1},{text:"While the United States raced the Soviet Union to the moon,\n       the Mexican government funneled millions of pesos into research on _.'",pick:1},{text:"Coming to Broadway this season, _: The Musical.",pick:1},{text:"What's my secret power?",pick:1},{text:"What gives me uncontrollable gas?",pick:1},{text:"But before I kill you, Mr. Bond, I must show you _.",pick:1},{text:"What never fails to liven up the party?",pick:1},{text:"What am I giving up for Lent?",pick:1},{text:"What do old people smell like? ",pick:1},{text:"The class field trip was completely ruined by _.",pick:1},{text:"When Pharaoh remained unmoved, Moses called down a plague of _.",pick:1},{text:"I do not know with which weapons World War III will be fought, but World War IV will be fought with _.",pick:1},{text:"What's Teach for America using to inspire inner city students to succeed?",pick:1},{text:"In Michael Jackson's final moments, he thought about _.",pick:1},{text:"Why do I hurt all over?",pick:1},{text:"Studies show that lab rats navigate mazes 50% faster after being exposed to _.",pick:1},{text:"Why am I sticky?",pick:1},{text:"What's my anti-drug?",pick:1},{text:"And the Academy Award for _ goes to _.",pick:2},{text:"For my next trick, I will pull _ out of _.",pick:2},{text:"_: Good to the last drop.",pick:1},{text:"What did Vin Diesel eat for dinner?",pick:1},{text:"_: kid-tested, mother-approved.",pick:1},{text:"What gets better with age?",pick:1},{text:"I never truly understood _ until I encountered _.",pick:2},{text:"Rumor has it that Vladimir Putin's favorite delicacy is _ stuffed with _.",pick:2},{text:"Lifetime&reg; presents _, the story of _.",pick:2},{text:"Make a haiku.",pick:3},{text:"In M. Night Shyamalan's new movie, Bruce Willis discovers that _ had really been _ all along.",pick:2},{text:"_ is a slippery slope that leads to _.",pick:2},{text:"In a world ravaged by _, our only solace is _.",pick:2},{text:"That's right, I killed _. How, you ask? _.",pick:2},{text:"When I was tripping on acid, _ turned into _.",pick:2},{text:"_ + _ = _.",pick:3},{text:"What's the next superhero/sidekick duo?",pick:2},{text:"Dear Abby,<br><br>I'm having some trouble with _ and would like your advice.",pick:1},{text:"After the earthquake, Sean Penn brought _ to the people of Haiti.",pick:1},{text:"In L.A. County Jail, word is you can trade 200 cigarettes for _.",pick:1},{text:"Maybe she's born with it. Maybe it's _.",pick:1},{text:"Life for American Indians was forever changed when the White Man introduced them to _.",pick:1},{text:"Next on ESPN2, the World Series of _.",pick:1},{text:"Step 1: _. Step 2: _. Step 3: Profit.",pick:2},{text:"Here is the church<br>Here is the steeple<br>Open the doors<br>And there is _.",pick:1},{text:"How did I lose my virginity?",pick:1},{text:"During his childhood, Salvador Dal&iacute; produced hundreds of paintings of _.",pick:1},{text:"In 1,000 years, when paper money is a distant memory, how will we pay for goods and services?",pick:1},{text:"What don't you want to find in your Kung Pao chicken?",pick:1},{text:"The Smithsonian Museum of Natural History has just opened an exhibit on _.",pick:1},{text:"Daddy, why is Mommy crying?",pick:1}],order:["Base"],whiteCards:["Coat hanger abortions.","Man meat.","Autocannibalism.","Vigorous jazz hands.","Flightless birds.","Pictures of boobs.","Doing the right thing.","The violation of our most basic human rights.","Viagra&reg;.","Self-loathing.","Spectacular abs.","A balanced breakfast.","Roofies.","Concealing a boner.","Amputees.","The Big Bang.","Former President George W. Bush.","The Rev. Dr. Martin Luther King, Jr.","Smegma.","Being marginalized.","Cuddling.","Laying an egg.","The Pope.","Aaron Burr.","Genital piercings.","Fingering.","A bleached asshole.","Horse meat.","Fear itself.","Science.","Elderly Japanese men.","Stranger danger.","The terrorists.","Praying the gay away.","Same-sex ice dancing.","Ethnic cleansing.","Cheating in the Special Olympics.","German dungeon porn.","Bingeing and purging.","Making a pouty face.","William Shatner.","Heteronormativity.","Nickelback.","Tom Cruise.","The profoundly handicapped.","The placenta.","Chainsaws for hands.","Arnold Schwarzenegger.","An icepick lobotomy.","Goblins.","Object permanence.","Dying.","Foreskin.","A falcon with a cap on its head.","Hormone injections.","Dying of dysentery.","Sexy pillow fights.","The invisible hand.","A really cool hat.","Sean Penn.","Heartwarming orphans.","The clitoris.","The Three-Fifths compromise.","A sad handjob.","Men.","Historically black colleges.","A micropenis.","Raptor attacks.","Agriculture.","Vikings.","Pretending to care.","The Underground Railroad.","My humps.","Being a dick to children.","Geese.","Bling.","Sniffing glue.","The South.","An Oedipus complex.","Eating all of the cookies before the AIDS bake-sale.","Sexting.","YOU MUST CONSTRUCT ADDITIONAL PYLONS.","Mutually-assured destruction.","Sunshine and rainbows.","Count Chocula.","Sharing needles.","Being rich.","Skeletor.","A sausage festival.","Michael Jackson.","Emotions.","Farting and walking away.","The Chinese gymnastics team.","Necrophilia.","Spontaneous human combustion.","Yeast.","Leaving an awkward voicemail.","Dick Cheney.","White people.","Penis envy.","Teaching a robot to love.","Sperm whales.","Scrubbing under the folds.","Panda sex.","Whipping it out.","Catapults.","Masturbation.","Natural selection.","Opposable thumbs.","A sassy black woman.","AIDS.","The KKK.","Figgy pudding.","Seppuku.","Gandhi.","Preteens.","Toni Morrison's vagina.","Five-Dollar Footlongs&trade;.","Land mines.","A sea of troubles.","A zesty breakfast burrito.","Christopher Walken.","Friction.","Balls.","Dental dams.","A can of whoop-ass.","A tiny horse.","Waiting 'til marriage.","Authentic Mexican cuisine.","Genghis Khan.","Old-people smell.","Feeding Rosie O'Donnell.","Pixelated bukkake.","Friends with benefits.","The token minority.","The Tempur-Pedic&reg; Swedish Sleep System&trade;.","A thermonuclear detonation.","Take-backsies.","The Rapture.","A cooler full of organs.","Sweet, sweet vengeance.","RoboCop.","Keanu Reeves.","Drinking alone.","Giving 110%.","Flesh-eating bacteria.","The American Dream.","Taking off your shirt.","Me time.","A murder most foul.","The inevitable heat death of the universe.","The folly of man.","That thing that electrocutes your abs.","Cards Against Humanity.","Fiery poops.","Poor people.","Edible underpants.","Britney Spears at 55.","All-you-can-eat shrimp for $4.99.","Pooping back and forth. Forever.","Fancy Feast&reg;.","Jewish fraternities.","Being a motherfucking sorcerer.","Pulling out.","Picking up girls at the abortion clinic.","The homosexual agenda.","The Holy Bible.","Passive-agression.","Ronald Reagan.","Vehicular manslaughter.","Nipple blades.","Assless chaps.","Full frontal nudity.","Hulk Hogan.","Daddy issues.","The hardworking Mexican.","Natalie Portman.","Waking up half-naked in a Denny's parking lot.","God.","Sean Connery.","Saxophone solos.","Gloryholes.","The World of Warcraft.","Homeless people.","Scalping.","Darth Vader.","Eating the last known bison.","Guys who don't call.","Hot Pockets&reg;.","A time travel paradox.","The milk man.","Testicular torsion.","Dropping a chandelier on your enemies and riding the rope up.","World peace.","A salty surprise.","Poorly-timed Holocaust jokes.","Smallpox blankets.","Licking things to claim them as your own.","The heart of a child.","Robert Downey, Jr.","Lockjaw.","Eugenics.","A good sniff.","Friendly fire.","The taint; the grundle; the fleshy fun-bridge.","Wearing underwear inside-out to avoid doing laundry.","Hurricane Katrina.","Free samples.","Jerking off into a pool of children's tears.","A foul mouth.","The glass ceiling.","Republicans.","Explosions.","Michelle Obama's arms.","Getting really high.","Attitude.","Sarah Palin.","The &Uuml;bermensch.","Altar boys.","My soul.","My sex life.","Pedophiles.","72 virgins.","Pabst Blue Ribbon.","Domino's&trade; Oreo&trade; Dessert Pizza.","A snapping turtle biting the tip of your penis.","The Blood of Christ.","Half-assed foreplay.","My collection of high-tech sex toys.","A middle-aged man on roller skates.","Bitches.","Bill Nye the Science Guy.","Italians.","A windmill full of corpses.","Adderall&trade;.","Crippling debt.","A stray pube.","Prancing.","Passing a kidney stone.","A brain tumor.","Leprosy.","Puppies!","Bees?","Frolicking.","Repression.","Road head.","A bag of magic beans.","An asymmetric boob job.","Dead parents.","Public ridicule.","A mating display.","A mime having a stroke.","Stephen Hawking talking dirty.","African children.","Mouth herpes.","Overcompensation.","Riding off into the sunset.","Being on fire.","Tangled Slinkys.","Civilian casualties.","Auschwitz.","My genitals.","Not reciprocating oral sex.","Lactation.","Being fabulous.","Shaquille O'Neal's acting career.","My relationship status.","Asians who aren't good at math.","Alcoholism.","Incest.","Grave robbing.","Hope.","8 oz. of sweet Mexican black-tar heroin.","Kids with ass cancer.","Winking at old people.","The Jews.","Justin Bieber.","Doin' it in the butt.","A lifetime of sadness.","The Hamburglar.","Swooping.","Classist undertones.","New Age music.","Not giving a shit about the Third World.","The Kool-Aid Man.","A hot mess.","Tentacle porn.","Lumberjack fantasies.","The gays.","Scientology.","Estrogen.","GoGurt&reg;.","Judge Judy.","Dick fingers.","Racism.","Surprise sex!","Police brutality.","Passable transvestites.","The Virginia Tech Massacre.","When you fart and a little bit comes out.","Oompa-Loompas.","A fetus.","Obesity.","Tasteful sideboob.","Hot people.","BATMAN!!!","Black people.","A gassy antelope.","Sexual tension.","Third base.","Racially-biased SAT questions.","Porn stars.","A Super Soaker&trade; full of cat pee.","Muhammed (Praise Be Unto Him).","Puberty.","A disappointing birthday party.","An erection that lasts longer than four hours.","White privilege.","Getting so angry that you pop a boner.","Wifely duties.","Two midgets shitting into a bucket.","Queefing.","Wiping her butt.","Golden showers.","Barack Obama.","Nazis.","A robust mongoloid.","An M. Night Shyamalan plot twist.","Getting drunk on mouthwash.","Lunchables&trade;.","Women in yogurt commercials.","John Wilkes Booth.","Powerful thighs.","Mr. Clean, right behind you.","Multiple stab wounds.","Cybernetic enhancements.","Serfdom.","Kanye West.","Women's suffrage.","Children on leashes.","Harry Potter erotica.","The Dance of the Sugar Plum Fairy.","Lance Armstrong's missing testicle.","Parting the Red Sea.","The Amish.","Dead babies.","Child beauty pageants.","AXE Body Spray.","Centaurs.","Copping a feel.","Grandma.","Famine.","The Trail of Tears.","The miracle of childbirth.","Finger painting.","A monkey smoking a cigar.","The Make-A-Wish&reg; Foundation.","Anal beads.","The Force.","Kamikaze pilots.","Dry heaving.","Active listening.","Ghosts.","The Hustle.","Peeing a little bit.","Another goddamn vampire movie.","Shapeshifters.","The Care Bear Stare.","Hot cheese.","A mopey zoo lion.","A defective condom.","Teenage pregnancy.","A Bop It&trade;.","Expecting a burp and vomiting on the floor.","Horrifying laser hair removal accidents.","Boogers.","Unfathomable stupidity.","Breaking out into song and dance.","Soup that is too hot.","Morgan Freeman's voice.","Getting naked and watching Nickelodeon.","MechaHitler.","Flying sex snakes.","The true meaning of Christmas.","My inner demons.","Pac-Man uncontrollably guzzling cum.","My vagina.","A homoerotic volleyball montage.","Actually taking candy from a baby.","Crystal meth.","Exactly what you'd expect.","Natural male enhancement.","Passive-aggressive Post-it notes.","Inappropriate yodeling.","Lady Gaga.","The Little Engine That Could.","Vigilante justice.","A death ray.","Poor life choices.","A gentle caress of the inner thigh.","Embryonic stem cells.","Nicolas Cage.","Firing a rifle into the air while balls deep in a squealing hog.","Switching to Geico&reg;.","The chronic.","Erectile dysfunction.","Home video of Oprah sobbing into a Lean Cuisine&reg;.","A bucket of fish heads.","50,000 volts straight to the nipples.","Being fat and stupid.","Hospice care.","A pyramid of severed heads.","Getting married, having a few kids, buying some stuff, retiring to Florida, and dying.","A subscription to Men's Fitness.","Crucifixion.","A micropig wearing a tiny raincoat and booties.","Some god-damn peace and quiet.","Used panties.","A tribe of warrior women.",'The penny whistle solo from "My Heart Will Go On."',"An oversized lollipop.","Helplessly giggling at the mention of Hutus and Tutsis.","Not wearing pants.","Consensual sex.","Her Majesty, Queen Elizabeth II.","Funky fresh rhymes.","The art of seduction.","The Devil himself.","Advice from a wise, old black man.","Destroying the evidence.","The light of a billion suns.","Wet dreams.","Synergistic management solutions.","Growing a pair.","Silence.","An M16 assault rifle.","Poopy diapers.","A live studio audience.","The Great Depression.","A spastic nerd.","Rush Limbaugh's soft, shitty body.","Tickling Sean Hannity, even after he tells you to stop.","Stalin.","Brown people.","Rehab.","Capturing Newt Gingrich and forcing him to dance in a monkey suit.","Battlefield amputations.","An uppercut.","Shiny objects.","An ugly face.","Menstrual rage.","A bitch slap.","One trillion dollars.","Chunks of dead prostitute.","The entire Mormon Tabernacle Choir.","The female orgasm.","Extremely tight pants.","The Boy Scouts of America.","Stormtroopers.","Throwing a virgin into a volcano."]},L={blackCards:G.blackCards,cardLimit:10,currentBlackCard:{pick:0,text:""},currentCzarID:0,gameStarted:!1,hand:[],name:"cah",playedCards:[],playerID:null,whiteCards:G.whiteCards,winnerCards:[],gameOver:!1,winningCardAmount:10},z=n(1);var R={turn:{activePlayers:z.A.ALL},endIf:function(e){return!0===(null===e||void 0===e?void 0:e.gameStarted)},start:!0,next:"draw"},J=n(6);var U=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if(0!==e)return Math.floor(Math.random()*Math.floor(e));throw new Error("Error: ".concat(e," passed to getRandomInt"))};function K(e){var t=U(e.length);return{card:e[t],deck:[].concat(Object(J.a)(e.slice(0,t)),Object(J.a)(e.slice(t+1)))}}function V(e,t,n){var a=K(null===e||void 0===e?void 0:e.whiteCards),i=a.card,r=a.deck;return Object(N.a)({},e,{whiteCards:r,hand:[].concat(Object(J.a)(null===e||void 0===e?void 0:e.hand),[{text:i,playerID:n}])})}var Y={turn:{activePlayers:z.A.ALL},moves:{drawCard:V},onBegin:function(e,t){var n,a=e;Object.keys(t.playOrder).forEach((function(t){for(var n=0;n<(null===(i=e)||void 0===i?void 0:i.cardLimit);n++){var i;a=V(a,0,t)}}));var i=K(null===(n=e=a)||void 0===n?void 0:n.blackCards),r=i.card,o=i.deck;return Object(N.a)({},e,{blackCards:o,currentBlackCard:r})},endIf:function(e,t){return(null===e||void 0===e?void 0:e.hand.length)===t.numPlayers*(null===e||void 0===e?void 0:e.cardLimit)},next:"play"},q=n(53),Q=n.n(q);function $(e){var t=Q()(null===e||void 0===e?void 0:e.hand,"playerID"),n=null===e||void 0===e?void 0:e.whiteCards,a=null===e||void 0===e?void 0:e.hand;return Object.keys(t).forEach((function(i){var r=t[i],o=(null===e||void 0===e?void 0:e.cardLimit)-r.length;if(o>0){var c=function(e,t){for(var n=[];t!==n.length;){var a=K(e),i=a.card;e=a.deck,n.push(i)}return{deck:e,cards:n}}(null===e||void 0===e?void 0:e.whiteCards,o),l=c.cards,s=c.deck,d=l.map((function(e){return{text:e,playerID:i}}));n=s,a=[].concat(Object(J.a)(null===e||void 0===e?void 0:e.hand),Object(J.a)(d))}})),Object(N.a)({},e,{whiteCards:n,hand:a})}var X=function(e,t,n){e.currentCzarID=((null===e||void 0===e?void 0:e.currentCzarID)+1)%t.numPlayers,e.winnerCards=[].concat(Object(J.a)(null===e||void 0===e?void 0:e.winnerCards),[n]),e.playedCards=[]},Z={turn:{activePlayers:z.A.ALL},moves:{voteCard:X},endIf:function(e){return 0===(null===e||void 0===e?void 0:e.playedCards.length)},onEnd:function(e){var t=K(null===e||void 0===e?void 0:e.blackCards),n=t.card,a=t.deck;return Object(N.a)({},e,{},$(e),{blackCards:a,currentBlackCard:n})},next:"draw"},ee=function(e,t,n){if(Number(n.playerID)!==Number(null===e||void 0===e?void 0:e.currentCzarID)){var a=null===e||void 0===e?void 0:e.hand.map((function(e){return e.text})).indexOf(n.text),i=[].concat(Object(J.a)(null===e||void 0===e?void 0:e.hand.slice(0,a)),Object(J.a)(null===e||void 0===e?void 0:e.hand.slice(a+1)));e.playedCards=[].concat(Object(J.a)(null===e||void 0===e?void 0:e.playedCards),[n]),e.hand=i}},te={turn:{activePlayers:z.A.ALL},moves:{playCard:ee},endIf:function(e,t){return(null===e||void 0===e?void 0:e.playedCards.length)===(t.numPlayers-1)*(null===e||void 0===e?void 0:e.currentBlackCard.pick)},next:"vote"},ne=n(119),ae=n.n(ne),ie={setup:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object(N.a)({},L,{},t)},moves:{startGame:function(e){return Object(N.a)({},e,{gameStarted:!0})},drawCard:V,voteCard:X,playCard:ee},phases:{setup:R,draw:Y,play:te,vote:Z},endIf:function(e){var t=Q()(null===e||void 0===e?void 0:e.winnerCards,"playerID"),n=Object.keys(t).map((function(e){return{playerId:e,winningCardCount:t[e].length}})),a=ae()(n,"winningCardCount").reverse()[0];return a&&a.winningCardCount>=e.winningCardAmount||void 0},onEnd:function(e){e.gameOver=!0}},re=n(29),oe=n(121),ce=(n(242),{font:{},colors:{blue:"#0064CD",white:"#FFF",black:"#2F2E2E"},padding:"28px",whiteCard:{bg:"#F4F4F4",fg:"#2F2E2E"},blackCard:{fg:"#F4F4F4",bg:"#2F2E2E"}});function le(){var e=Object(c.a)(["\n  align-items: flex-start;\n  background-color: ",";\n  border-color: #707070;\n  border-style: solid;\n  border-width: 1px;\n  display: flex;\n  flex-direction: row;\n  font-weight: bold;\n  height: 50px;\n  justify-content: space-between;\n  margin-bottom: 20px;\n  padding: 10px;\n"]);return le=function(){return e},e}function se(){var e=Object(c.a)(["\n  color: ",";\n"]);return se=function(){return e},e}var de=function(e){var t=e.text,n=Object(a.useContext)(d.a);return a.createElement(he,null,a.createElement(ue,{style:{margin:0}},t),a.createElement("div",{style:{display:"flex",alignSelf:"center"}},a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},a.createElement("path",{d:"M0 0h24v24H0V0z",fill:"none"}),a.createElement("path",{fill:n.colors.blue,d:"M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}))))},ue=d.c.p(se(),(function(e){return e.theme.whiteCard.fg})),he=d.c.div(le(),(function(e){return e.theme.colors.white})),pe=i.a.createContext({}),ge=function(e){var t=e.cardList,n=Object(a.useContext)(pe),r=n.G,o=n.playerId,c=void 0===o?"":o;return i.a.createElement("ul",{"data-test-id":"players-hand",style:{listStyle:"none",margin:0,padding:0}},t.filter((function(e){return e.playerID===c})).map((function(e,t){return i.a.createElement(re.b,{key:"".concat(e.text,"-").concat(t),draggableId:"".concat(e.text,"-").concat(t),index:t,isDragDisabled:Number(c)===Number(null===r||void 0===r?void 0:r.currentCzarID)},(function(t){return i.a.createElement("li",Object.assign({ref:t.innerRef,key:e.text},t.draggableProps,t.dragHandleProps),i.a.createElement(de,{text:e.text}))}))})))},me=n(79),fe=function(e){var t=e.phase,n=void 0===t?"Unknown":t;return a.useEffect((function(){Object(me.b)("New Phase!  ".concat(null===n||void 0===n?void 0:n.toUpperCase()),{containerId:"phase"})}),[n]),a.createElement(me.a,{enableMultiContainer:!0,containerId:"phase"})};function be(){var e=Object(c.a)(["\n  margin: 0;\n  margin-bottom: ",";\n  font-weight: bold;\n  font-size: 16px;\n"]);return be=function(){return e},e}function ye(){var e=Object(c.a)(["\n  @media (max-width: 768px) {\n    width: calc(100% - 56px);\n    min-height: 10%;\n  }\n  padding: ",";\n  background-color: ",";\n  color: ",";\n  width: 30vw;\n  :disabled {\n    background-color: ",";\n  }\n"]);return ye=function(){return e},e}function ve(){var e=Object(c.a)(["\n  @media (max-width: 768px) {\n    width: calc(100% - 56px);\n  }\n  height: 100%;\n  padding: ",";\n  background-color: ",";\n  color: ",";\n  width: 30vw;\n"]);return ve=function(){return e},e}function ke(){var e=Object(c.a)(["\n  @media (max-width: 768px) {\n    flex-direction: column;\n    justify-content: flex-start;\n    width: 100%;\n  }\n  background-color: ",";\n  display: flex;\n  flex-direction: row-reverse;\n  justify-content: center;\n  height: 100%;\n"]);return ke=function(){return e},e}var xe=function(e){var t=e.G,n=e.ctx,r=e.playerID,o=e.moves,c=e.gameID,l=Object(a.useState)([]),s=Object(g.a)(l,2),d=s[0],u=s[1];Object(a.useEffect)((function(){var e=null===t||void 0===t?void 0:t.hand.filter((function(e){return e.playerID===r}));u(e)}),[t.hand,u,r]);var h=Number(r)===(null===t||void 0===t?void 0:t.currentCzarID)?null===t||void 0===t?void 0:t.playedCards:null===t||void 0===t?void 0:t.playedCards.filter((function(e){return Number(e.playerID)===Number(r)}));return i.a.createElement(i.a.Fragment,null,i.a.createElement(fe,{phase:n.phase}),i.a.createElement(re.a,{onDragEnd:function(e){if(e.destination){if("white-card-area"===e.destination.droppableId){var n=function(e,t,n){var a=Array.from(e),i=a.splice(t,1),r=Object(g.a)(i,1)[0];return a.splice(n,0,r),a}(d,e.source.index,e.destination.index);u(n)}if("black-card-area"===e.destination.droppableId){var a=null===t||void 0===t?void 0:t.hand.filter((function(e){var t=e.playerID;return String(t)===String(r)}))[e.source.index];o.playCard(a,r)}}}},i.a.createElement(pe.Provider,{value:{G:t,ctx:n,playerId:r,gameId:c}},!1===(null===t||void 0===t?void 0:t.gameStarted)?i.a.createElement(i.a.Fragment,null,i.a.createElement("button",{"data-test-id":"start-game-button",onClick:function(){return o.startGame()},disabled:"setup"!==n.phase},"Start Game")):i.a.createElement(i.a.Fragment,null,i.a.createElement(we,null,!0===t.gameOver&&i.a.createElement(oe.a,{"data-test-id":"win-dialog"},i.a.createElement("p",null,"Winner Winner Chicken Dinner")),i.a.createElement(re.c,{droppableId:"black-card-area"},(function(e){return i.a.createElement(Ae,Object.assign({ref:e.innerRef},e.droppableProps),i.a.createElement(Ie,null,null===t||void 0===t?void 0:t.currentBlackCard.text),i.a.createElement("ul",{"data-test-id":"played-card-list",style:{listStyle:"none",margin:0,padding:0,height:"80%"}},h.map((function(e){return i.a.createElement("li",{key:e.text,onClick:function(n){return Number(r)===(null===t||void 0===t?void 0:t.currentCzarID)?o.voteCard(e):null}},i.a.createElement(de,{text:e.text}))}))),e.placeholder)})),i.a.createElement(re.c,{droppableId:"white-card-area"},(function(e){return i.a.createElement(Ce,null,i.a.createElement("div",Object.assign({ref:e.innerRef},e.droppableProps),i.a.createElement(Ie,null,"Your Cards"),i.a.createElement(ge,{cardList:d}),e.placeholder))})))))))},we=d.c.div(ke(),(function(e){return e.theme.whiteCard.bg})),Ce=d.c.div(ve(),(function(e){return e.theme.padding}),(function(e){return e.theme.whiteCard.bg}),(function(e){return e.theme.whiteCard.fg})),Ae=d.c.div(ye(),(function(e){return e.theme.padding}),(function(e){return e.theme.blackCard.bg}),(function(e){return e.theme.blackCard.fg}),(function(e){var t=e.theme;return"".concat(t.blackCard.bg,"22")})),Ie=d.c.h2(be(),(function(e){return e.theme.padding})),Se=function(){var e=Object(s.f)(),t=Object(F.a)({board:xe,game:ie,multiplayer:Object(H.b)({server:x}),debug:!1});return i.a.createElement(t,{gameID:e.params.gameID,credentials:e.params.playerCredentials,playerID:e.params.playerID})};function Te(){var e=Object(c.a)(["\n  height: 100%;\n"]);return Te=function(){return e},e}var Ee=function(){return i.a.createElement(d.b,{theme:ce},i.a.createElement(Oe,null,i.a.createElement(l.a,{basename:"/cah"},i.a.createElement(s.a,{exact:!0,path:"/",component:S}),i.a.createElement(s.a,{exact:!0,path:"/join/:gameId?",component:P}),i.a.createElement(s.a,{exact:!0,path:"/game/:gameID/:playerCredentials/:playerID",component:Se}))))},Oe=d.c.div(Te());var je=function(){return i.a.createElement(Ee,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(je,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[128,1,2]]]);
//# sourceMappingURL=main.1209e517.chunk.js.map