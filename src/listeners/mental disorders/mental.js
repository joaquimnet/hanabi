const { Listener } = require("@ponatech/bot");

module.exports = new Listener({
  words: ["(what|wtf)", "mental", "(disorder|illness)s{0,1}", "{be}"], // "what is mental illness?" but dude i say that
  // fuck english. Amen.
  category: "mental awareness",
  cooldown: 15,
  priority: 0,
  async run(bot, message, meta) {
    message.channel.startTyping().catch(() => {});
    await bot.wait(5000);

    // thats a lot of text wow
    await meta.respond(
      `I am thankful you would like to know more about __*mental illnesses/disorders.*__`,
      `:white_flower: There are currently *four* __**Anxiety disorders**__: **Generalized Anxiety Disorder, Panic Disorder, Phobias, and Social Anxiety Disorder**. Some people have more than one, in fact; it's fairly __common__.`,
      `:white_flower: There is also __**Adult Attention Deficit/Hyperactivity Disorder**__; also known as __**ADD/ADHD**__.`,
      `:white_flower: There are four types of __**Bipolar Disorder**__ episodes and like anxiety, *people can have more than one episode at a time*. **Major Depressive Episode, Hypomanic Episode, Manic Episode, and Mixed Specifier/Episode.**`,
      `:white_flower: __**Depression**__ is currently the most popular mental illness, which is exactly what it sounds like. There are also two Depressive disorders, and these are **PostPartum Depression and Depressive Disorder with Seasonal Pattern**, or more commonly known as: **Seasonal Affective Disorder (SAD) **.`,
      `:white_flower: __**Eating Disorders**__ are also mental as well; **Anorexia Nervosa, Binge Eating Disorder, and Bulimia Nervosa.** `,
      `:white_flower: __**Obsessive-Compulsive Disorder**__ also known as: (__**OCD**__).`,
      `:white_flower: __**Opioid Use Disorder**__ which can very from mild to very extreme; like all mental illnesses.`,
      `:white_flower: __**Posttraumatic Stress Disorder**__  is a debilitating mental disorder that can occur when a person has directly experienced — or even just witnessed — an extremely traumatic, tragic, or terrifying event.`
    );
    await meta.respond(
      `:white_flower: __**Schizophrenia**__ is a serious mental illness characterized by a person experiencing a combination of delusions and hallucinations. Because these delusions and hallucinations feel as real as the world around them, a person with untreated schizophrenia can sometimes have trouble distinguishing actual reality from this altered reality that their brain is telling them.`,
      `:white_flower: Next we have __**Dissociative Disorders**__. There are currently *five* identified. These are **Depersonalization Disorder, Dissociative Amnesia, Dissociative Fugue, Dissociative Identity Disorder, and Dissociative Disorder Not Otherwise Specified (NOS).**`,
      `:white_flower: There is also __**Selective Mutism**__ which is a type of anxiety disorder whose main distinguishing characteristic is the persistent failure to speak in specific social situations (e.g., at school or with playmates) where speaking is expected, despite speaking in other situations.`,
      `\n`,
      `:orange_heart:__**Awareness is the first step to ending the stigma.**__:orange_heart:`
      //`:orange_heart: If you would like to learn more about any of these, please feel free to use ___ followed by the one you would like to look into!`,
    );

    message.channel.stopTyping();
    return true;
  },
});
