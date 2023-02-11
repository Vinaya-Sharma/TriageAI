const liveData = [
  {
    name: "Lilly Dole",
    status: "open",
    number: "292-292-2983",
    emergency: "Abuse",
    priority: 2,
    transcript: `Caller: Theres a big accident on the road.
      Dispatcher: Okay, stay calm. Can you tell me your location?
      Caller: I'm on Airport road right now.
      Dispatcher: Okay, can I get your full name
      Caller: Lilly Dole.
      Dispatcher: and whats your phone number just in case we are disconnected
      Caller: 292-292-2983.
      Dispatcher: Tell me what you see?
      Caller: theres been a car crash with two black cars.
      Dispatcher: Is eveyone fine?
      Caller: its not too bad but its blocking the major intersection.
      Dispatcher: Don't worry, help is on the way. I'm going to end the call to coordinate dispatch efforts, but you should hear back from 9-1-1 officers really soon.`,
    location: "Airport road",
    id: `efjejoqokwjqfjwq`,
  },
  {
    name: "Krishiv Saini",
    status: "open",
    number: "372-282-2839",
    emergency: "Fire",
    priority: 1,
    transcript: `Caller: I just saw a car accident on the road.
      Dispatcher: Okay, stay calm. Can you tell me your location?
      Caller: Yes its on Airport road .
      Dispatcher: Okay, can I get your full name
      Caller: Bruce Wayne.
      Dispatcher: and whats your phone number just in case we are disconnected
      Caller: 372-282-2839.
      Dispatcher: Tell me what you see?
      Caller: I was just driving along when i saw a huge crash between 2 cars. theres a mom and a girl in one car and a guy in the other.
      Dispatcher: Is eveyone fine?
      Caller: Yeah everyone looks fine but its blocking the major intersection.
      Dispatcher: Don't worry, help is on the way. I'm going to end the call to coordinate dispatch efforts, but you should hear back from 9-1-1 officers really soon.`,
    location: "Airport road",
    id: `efnjffejwnwjnfj`,
  },
];

const automatedData = [
  {
    name: "Bob Marley",
    status: "open",
    number: "292-292-2983",
    emergency: "Car Accident",
    priority: 3,
    transcript: `Caller: Theres a big accident on the road.
      Dispatcher: Okay, stay calm. Can you tell me your location?
      Caller: I'm on Airport road right now.
      Dispatcher: Okay, can I get your full name
      Caller: Bob Marley.
      Dispatcher: and whats your phone number just in case we are disconnected
      Caller: 292-292-2983.
      Dispatcher: Tell me what you see?
      Caller: theres been a car crash with two black cars.
      Dispatcher: Is eveyone fine?
      Caller: its not too bad but its blocking the major intersection.
      Dispatcher: Don't worry, help is on the way. I'm going to end the call to coordinate dispatch efforts, but you should hear back from 9-1-1 officers really soon.`,
    location: "Airport road",
    id: `efjejbwwfwfwnoqokq`,
  },
  {
    name: "Bruce Wayne",
    status: "open",
    number: "372-282-2839",
    emergency: "Car Crash",
    priority: 2,
    transcript: `Caller: I just saw a car accident on the road.
      Dispatcher: Okay, stay calm. Can you tell me your location?
      Caller: Yes its on Airport road .
      Dispatcher: Okay, can I get your full name
      Caller: Bruce Wayne.
      Dispatcher: and whats your phone number just in case we are disconnected
      Caller: 372-282-2839.
      Dispatcher: Tell me what you see?
      Caller: I was just driving along when i saw a huge crash between 2 cars. theres a mom and a girl in one car and a guy in the other.
      Dispatcher: Is eveyone fine?
      Caller: Yeah everyone looks fine but its blocking the major intersection.
      Dispatcher: Don't worry, help is on the way. I'm going to end the call to coordinate dispatch efforts, but you should hear back from 9-1-1 officers really soon.`,
    location: "Airport road",
    id: `efnjwfgwgfnjddfnwjnfj`,
  },
  {
    name: "Rachel Green",
    status: "open",
    number: "1111 666 5963",
    emergency: "Being Followed",
    priority: 1,
    transcript: `Caller: Hello there is a man following me.
      Dispatcher: Okay, stay calm. Can you tell me your location?
      Caller: Yeah, I'm at the Toronto Pearson Airport.
      Dispatcher: Okay, can I get your full name
      Caller: Yeah, it's Rachel Green.
      Dispatcher: and whats your phone number just in case we are disconnected
      Caller: 1, 1, 1 6 6, 6 5, 9 6 3.
      Dispatcher: What is the health emergency?
      Caller: It's not a health emergency is a man following me and I don't feel safe.
      Dispatcher: What is the man doing?
      Caller: She just keeps looking at me, weird and falling behind me.
      Dispatcher: Don't worry, help is on the way. I'm going to end the call to coordinate dispatch efforts, but you should hear back from 9-1-1 officers really soon.`,
    location: "Toronto Pearson Airport",
    id: `vghvggwdwwwhvgh`,
  },
  {
    name: "Tom Holland",
    status: "open",
    number: "444-333-2929",
    emergency: "Car Crash",
    priority: 2,
    transcript: `Caller: I need help im in a car crash.
      Dispatcher: Okay, stay calm. Can you tell me your location?
      Caller: Yeah, I'm on Bay and Wellington.
      Dispatcher: Okay, can I get your full name
      Caller: Yeah, it's Tom Holland.
      Dispatcher: and whats your phone number just in case we are disconnected
      Caller: 444-333-2929.
      Dispatcher: Who is in the car with you?
      Caller: Its me and my daughter.
      Dispatcher: Is anyone hurt?
      Caller: No no ones injured but we are stuck in the car.
      Dispatcher: Don't worry, help is on the way. I'm going to end the call to coordinate dispatch efforts, but you should hear back from 9-1-1 officers really soon.`,
    location: "Bay and Wellington",
    id: `juhuiwdwhiegwojij`,
  },
  {
    name: "Gurpreet Sign",
    status: "open",
    number: "1211 636 5993",
    emergency: "Being Followed",
    priority: 1,
    transcript: `Caller: Hello there is a man following me.
        Dispatcher: Okay, stay calm. Can you tell me your location?
        Caller: Yeah, I'm at the Toronto Pearson Airport.
        Dispatcher: Okay, can I get your full name
        Caller: Yeah, it's Rachel Green.
        Dispatcher: and whats your phone number just in case we are disconnected
        Caller: 1, 1, 1 6 6, 6 5, 9 6 3.
        Dispatcher: What is the health emergency?
        Caller: It's not a health emergency is a man following me and I don't feel safe.
        Dispatcher: What is the man doing?
        Caller: She just keeps looking at me, weird and falling behind me.
        Dispatcher: Don't worry, help is on the way. I'm going to end the call to coordinate dispatch efforts, but you should hear back from 9-1-1 officers really soon.`,
    location: "Toronto Pearson Airport",
    id: `vgewdwjfnwhvvgh`,
  },
  {
    name: "Tommy Doughlas",
    status: "open",
    number: "444-333-2929",
    emergency: "Car Crash",
    priority: 2,
    transcript: `Caller: I need help im in a car crash.
        Dispatcher: Okay, stay calm. Can you tell me your location?
        Caller: Yeah, I'm on Bay and Wellington.
        Dispatcher: Okay, can I get your full name
        Caller: Yeah, it's Tom Holland.
        Dispatcher: and whats your phone number just in case we are disconnected
        Caller: 444-333-2929.
        Dispatcher: Who is in the car with you?
        Caller: Its me and my daughter.
        Dispatcher: Is anyone hurt?
        Caller: No no ones injured but we are stuck in the car.
        Dispatcher: Don't worry, help is on the way. I'm going to end the call to coordinate dispatch efforts, but you should hear back from 9-1-1 officers really soon.`,
    location: "Bay and Wellington",
    id: `juhefwdjnwuihioj`,
  },
  {
    name: "Bob Marley",
    status: "open",
    number: "292-292-2983",
    emergency: "Car Accident",
    priority: 2,
    transcript: `Caller: Theres a big accident on the road.
        Dispatcher: Okay, stay calm. Can you tell me your location?
        Caller: I'm on Airport road right now.
        Dispatcher: Okay, can I get your full name
        Caller: Bob Marley.
        Dispatcher: and whats your phone number just in case we are disconnected
        Caller: 292-292-2983.
        Dispatcher: Tell me what you see?
        Caller: theres been a car crash with two black cars.
        Dispatcher: Is eveyone fine?
        Caller: its not too bad but its blocking the major intersection.
        Dispatcher: Don't worry, help is on the way. I'm going to end the call to coordinate dispatch efforts, but you should hear back from 9-1-1 officers really soon.`,
    location: "Airport road",
    id: `eejbwwdnefjnwoqokq`,
  },
  {
    name: "Brian Stein",
    status: "open",
    number: "372-222-2829",
    emergency: "Shooting",
    priority: 1,
    transcript: `Caller: I just saw a car accident on the road.
        Dispatcher: Okay, stay calm. Can you tell me your location?
        Caller: Yes its on Airport road .
        Dispatcher: Okay, can I get your full name
        Caller: Bruce Wayne.
        Dispatcher: and whats your phone number just in case we are disconnected
        Caller: 372-282-2839.
        Dispatcher: Tell me what you see?
        Caller: I was just driving along when i saw a huge crash between 2 cars. theres a mom and a girl in one car and a guy in the other.
        Dispatcher: Is eveyone fine?
        Caller: Yeah everyone looks fine but its blocking the major intersection.
        Dispatcher: Don't worry, help is on the way. I'm going to end the call to coordinate dispatch efforts, but you should hear back from 9-1-1 officers really soon.`,
    location: "Airport road",
    id: `efnjefdwefwnnjfnwfj`,
  },
  {
    name: "Hailey Ail",
    status: "open",
    number: "1111 666 5963",
    emergency: "Being Followed",
    priority: 3,
    transcript: `Caller: Hello there is a man following me.
        Dispatcher: Okay, stay calm. Can you tell me your location?
        Caller: Yeah, I'm at the Toronto Pearson Airport.
        Dispatcher: Okay, can I get your full name
        Caller: Yeah, it's Rachel Green.
        Dispatcher: and whats your phone number just in case we are disconnected
        Caller: 1, 1, 1 6 6, 6 5, 9 6 3.
        Dispatcher: What is the health emergency?
        Caller: It's not a health emergency is a man following me and I don't feel safe.
        Dispatcher: What is the man doing?
        Caller: She just keeps looking at me, weird and falling behind me.
        Dispatcher: Don't worry, help is on the way. I'm going to end the call to coordinate dispatch efforts, but you should hear back from 9-1-1 officers really soon.`,
    location: "Toronto Pearson Airport",
    id: `hvghefffjnevgh`,
  },
  {
    name: "Tracy Barns",
    status: "open",
    number: "444-333-2929",
    emergency: "Car Crash",
    priority: 4,
    transcript: `Caller: I need help im in a car crash.
        Dispatcher: Okay, stay calm. Can you tell me your location?
        Caller: Yeah, I'm on Bay and Wellington.
        Dispatcher: Okay, can I get your full name
        Caller: Yeah, it's Tom Holland.
        Dispatcher: and whats your phone number just in case we are disconnected
        Caller: 444-333-2929.
        Dispatcher: Who is in the car with you?
        Caller: Its me and my daughter.
        Dispatcher: Is anyone hurt?
        Caller: No no ones injured but we are stuck in the car.
        Dispatcher: Don't worry, help is on the way. I'm going to end the call to coordinate dispatch efforts, but you should hear back from 9-1-1 officers really soon.`,
    location: "Bay and Wellington",
    id: `juhuihfwwejknjij`,
  },
];

export { liveData, automatedData };
