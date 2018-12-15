webpackJsonp([0x95041e3a1a6a],{413:function(e,t){e.exports={data:{markdownRemark:{html:"<p>Vue.js is an amazing framework, which can be as powerful as Angular or React, the two big heavy hitters in the world of front-end frameworks.  </p>\n<p>And it can be easier to use.  That is - it can be.  But here's the problem with Vue - because Vue gives you so many options to how to do things, the temptation is to actually use all of them. </p>\n<p>If you're familiar with React, most of the same basic concepts apply, only instead of needing to call a setter (i.e., this.setState({key: value})), you can simply reassign the variable.  This is due to Observables... in other words, if the value a function depends on changes, Vue will automatically detect that and run the function again, causing a re-render.  </p>\n<p>Vue is very powerful in that respect, allowing for less verbose code, and a little less boilerplate.  And it has less of a learning curve than React.  But the irony of Vue's lower learning curve is that while it is easier to do most things in Vue, it's also easier to make serious mistakes that can make adding features or debugging harder.  </p>\n<p>Coming over from React, I was able to see how Vue was much simpler, but as a React developer, I found that the discipline of the flow pattern, and expected best React practices really helped me organize my Vue code a lot better.  I'm glad I learned React first, instead of the other way around. </p>\n<p>Recently, at Deverus, we've had to redesign, almost from scratch, our integration manager project. We were facing a deadline and so we had to rely on a third-party contractor to develop it while the in-house team really couldn't spend enough time to catch developing code problems.  To be fair, that code base did some really good things, and we didn't have to redevelop HTML or CSS files. They were under a huge time-pressure as well.  I don't think I could have done any better under the same constraints.  We basically went with \"fast and cheap\" of the good-fast-cheap triangle, because we needed it.  </p>\n<p>Yet, it worked. That really was a small miracle. So I can't fault them too badly.  The problem was that in the rush to get everything out, the resulting code base wasn't <em>maintainable.</em>  This was very clear when we tried to add a single toggle switch (a boolean value) and we were still trying to get it done after 2 days.  </p>\n<p>It wasn't broken code.  It was <em>unmaintainable</em> code.  </p>\n<p>Here's some of the problems we encountered, and some of the best practices we've adopted to try to avoid those mistakes.  </p>\n<h2>Problem One: Application flow</h2>\n<p>While Vue has a number of advantages over React, (especially Vuex compared to Redux), I'm <em>very</em> glad that I learned React/Redux first.  The reason is that application flow is important.  Your codebase needs to follow the same patterns and do things the same way.  But with Vue, there are <em>so many ways</em> to do the same thing. </p>\n<p>For example, you could store data in the Vuex store, or in the local component data() function.  </p>\n<p>If you store data in the Vuex store, you need to dispatch an action to change it.  If you want to access it, you can do so either by creating a getter and mapping that to your computed methods, <em>or</em> you can map the state of the vuex store itself to your component <em>or</em>, you can just access it directly with this.$store.state.variable...</p>\n<p>That's just reading it.  You can write via passing in an action, which is passed in mapActions to your methods, or access this.$store.actions[actionName], or you can edit the value stored in the store directly, though Vuex will throw off an error and tell you not to do that.  </p>\n<p>That doesn't even get into the component's local data and props. </p>\n<p>So whenever you work with an application-scope variable, you have to ask yourself:</p>\n<ul>\n<li>\n<p>Where is this variable's single source of truth stored? Vuex Store? This component? A parent component? </p>\n</li>\n<li>\n<p>How do I read that variable?  Getters? Directly? Props? </p>\n</li>\n<li>\n<p>If I want to change that veriable, how do I do so? Dispatch an action? this.emit('keyword', value)? Just reassign it? </p>\n</li>\n<li>\n<p>When that variable changes, what happens? Should it re-render items?  Should a change trigger another event?  </p>\n</li>\n<li>\n<p>How should it trigger the next event?  Should dispatching one action (conditionally?) dispatch another action?  Should we set up a watch: function on a component or multiple components?  </p>\n</li>\n</ul>\n<p>The thing is - there aren't any hard and fast ways that you MUST do this. </p>\n<p>In the code we got, the first problem was data management.    </p>\n<h3>Do not store constant values in an observable.</h3>\n<p>One big problem we had was that for whatever reason, constant data - that is, data that never changes, like the configuration files for a widget, or the address of the API server, was stored in the Vuex state. This was problematic for two reasons. </p>\n<p>First, you'd often have a massive structured object which was some sort of configuration object for an existing component that never changed.  One good example was that we were using Vue Highcharts to show off our existing data visually.  Vue Highcharts requires a passed-in configuration object, one that tells you whether or not you want a pie chart, bar chart, line chart, etc. </p>\n<p>But since 90% of the configuration would be the same for each chart, it didn't make sense to store the parts that we knew wouldn't change with the parts that we wanted to observe.  In other words, we cared about the data set, certainly, but the rest of that object could be left alone - in the refactor, we store only the dataset in the store, and leave the rest of the configuration object as a seperate constant. </p>\n<p>Even when there is a complex relationship between the configuration object and the dataset that changes, Vuex has an elegant way to handle that problem: getters. </p>\n<p>If you're familiar with React-Redux, this is a lot like the higher order function you put into mapStateToProps.  It takes the Redux store as the variable, and outputs an object that can be accessed via React's props: </p>\n<pre><code class=\"language-javascript\">// react/redux code\n\nconst mapStateToProps = state => ({\n  foo: state.foo,\n  bar: state.bar,\n  barSquared: state.bar * state.bar,\n  fooReversed: state.foo.split('').reverse().join(''), \n})\n\nexport default connect(mapStateToProps, mapDispatchToProps)(YourComponentHere)\n// your component can now access this.props.barSquared as a prop. \n</code></pre>\n<p>Vuex doesn't need the external library that Redux does, so all one has to do is define the getters for the application, in almost exactly the same way. </p>\n<pre><code class=\"language-javascript\">// vue/vuex code\n\nconst localGetters = {\n  foo: state => state.foo,\n  bar: state => state.bar,\n  barSquared: state => state.bar * state.bar,\n  fooReversed: state => state.foo.split('').reverse().join(''), \n}\n\nexport {\n  state: initialState,\n  getters: localGetters,\n  actions,\n  mutations\n}\n</code></pre>\n<p>So, with that said, if you have a complex object dataset, which takes the data as one property on that complex object, why not just define it in a getter?</p>\n<h4>Don't Do This:</h4>\n<pre><code class=\"language-javascript\">// DON'T DO THIS\n\nconst types = {\n  CHANGE_DATA: \"CHANGE_DATA\"\n}\n\nconst initialState = {\n  xSize: 388,\n  ySize: 400,\n  type: \"barchart\",\n  colors: ['yellow', 'red', 'green', 'purple', 'blue'],\n  dataset: [] // this is the only value that changes. \n} \n\nconst localGetters = {\n  barchart: state => state,\n}\n\nconst actions = {\n  changeBarChart({commit}, newData){\n    commit(types.CHANGE_DATA, newData)\n  }\n}\n\nconst mutations = {\n  [types.CHANGE_DATA](state, newData){\n    state.dataset = newData;\n  }\n}\n</code></pre>\n<h4>Do this:</h4>\n<pre><code class=\"language-javascript\">// Do this\n\nconst types = {\n  CHANGE_DATA: \"CHANGE_DATA\"\n}\n\nconst initialState = {\n  dataset: [] \n} \n\nconst localGetters = {\n  barchart: state => ({\n    xSize: 388,\n    ySize: 400,\n    type: \"barchart\",\n    colors: ['yellow', 'red', 'green', 'purple', 'blue'],\n    dataset: state.dataset\n  })\n}\n\nconst actions = {\n  changeBarChart({commit}, newData){\n    commit(types.CHANGE_DATA, newData)\n  }\n}\n\nconst mutations = {\n  [types.CHANGE_DATA](state, newData){\n    state.dataset = newData;\n  }\n}\n</code></pre>\n<p>Even better would be to store these configuration files elsewhere so that you don't even have to worry about constant and mutable values in the same file. </p>\n<pre><code class=\"language-javascript\">  // 'store/util/chartConfig.js';  \n  export const makeBarchart = (dataset) => ({\n    xSize: 388,\n    ySize: 400,\n    type: \"barchart\",\n    colors: ['yellow', 'red', 'green', 'purple', 'blue'],\n    dataset\n  })\n  \n  // store/modules/chart.js\n  import {makeBarchart} from '../util/chartConfig.js'\n  \n  const localGetters = {\n    barchart: state => makeBarchart(state.dataset)\n  }\n</code></pre>\n<h2>Watchers are to be used sparingly and for good reason.</h2>\n<p>There's nothing wrong with using a watcher to trigger something happening during a change in state.  For example, we have a datepicker component that we re-use throughout the whole application. But whatever page you're on, whether it's the stats screen, the partner screen, or the queue screen, changing the dates in the datepicker should cause the application to fetch the data <em>from those dates</em> from the API.  </p>\n<p>Rather than building out something complex, or building out three seperate datepickers, we use the watch function to dispatch an action when that datepicker changes.  This way, we get the data we need, without having to worry about a nest of callbacks.</p>\n<p>But watchers have a significant problem: it reverses the control flow.  </p>\n<p>That is, normally, a programmer can follow what's going on - dispatching an action does things which change data variables.  But what <em>watch</em> does is different - it <em>executes a function based on a changed data variable.</em>  What that means is that you can have application code that changes a variable in one part of the application triggering behavior in a completely seperate and unrelated part of the program.  This makes for bad \"mystery bugs\" because they're so hard to track down - there's no indication that the function you initially call will have any other side effects than what's in the function. </p>\n<p>Vuex has very good tools for making sure that a dispatched action triggers another action (even conditionally).  It also recalculates items on the fly whenever observed values change in it's calculated functions and methods. So watchers should be used very sparingly.  </p>\n<p>In the unmaintainable code, this was actually taken to extremes at one point, in one of the few \"WTF code\" moments.  </p>\n<p>We had a case where there was a \"save button\" on the parent component, but the data to be saved was actually stored in the data of the child component. </p>\n<p>The way it was originally handled (which was an \"almost clever\") solution, was to have the action that actually saved the data located on the child (where the data was), in the watch component. What the save button would do is flip the bit called \"saveSettingsFlag\" - a boolean in the Vuex data store.  This would trigger a watched variable.  (It didn't matter if we were changing from true to false, or false to true, it was the <em>change</em> that triggered the watch.)  </p>\n<p>Almost clever. </p>\n<p>One of the problems that this caused was that we'd have to wrap changing the save settings flag into a promise, to make sure that all the watchers associated with that flag (which might have async actions or change the state of the vuex store) executed before moving onto the next instructions.  Even then, we were still having problems with this code.  </p>\n<pre><code class=\"language-javascript\">// BAD CODE.\n// in parent methods: \n\nsaveSettings() {\n  const p = () => new Promise((resolve, reject) => {\n    try {\n      // this line just flips the bit to trigger the watchers.\n      this.settingsOpt.saveSettingsFlag = !this.settingsOpt.saveSettingsFlag\n      resolve(this.settingsOpt.saveSettingsFlag)\n    } catch (e) {\n      reject(e)\n    }\n  })\n  p()\n    .then(() => this.$API.configureClient(this.client.clientId, this.client.requestorId)) // more on this line in a bit... it's also bad.\n    .then((configList) => {\n      this.saveSettingsStatus = 'success'\n      this.saveClient()\n    }, (err) => {\n      this.saveSettingsStatus = 'error'\n      console.error('Error loading clients private config data!', err)\n    })\n    .catch((errorMsg) => console.error(errorMsg))\n},\n\n// in a child component: \n\n   watch: {\n      'options.saveSettingsFlag': function () {\n        // this is an async function!!!\n        this.$store.dispatch('saveSettings', this.clientSettings) \n        if (this.options.incrementStep) {\n          this.options.incrementStep()\n        }\n      }\n    }\n</code></pre>\n<p>The way we handled this was by using the Sync/Emit pattern.  </p>\n<p>The first thing we did was to create a proxy data object stored in the parent, where the save settings button was.  (I'll get more into proxy objects later, but it's basically like checking out a copy of the data in the vuex store to edit and mess around, then optionally save later, with without actually changing the Vuex store and triggering anything observing those variables in the Vuex store.) </p>\n<p>That local proxy was stored in the parent's data object as \"localProxy\" and passed into the children </p>\n<p>We rewrote the child component so that it wouldn't store the data locally, only in the context of the parent's data.  To this end, instead of using a watch to trigger a function defined in the child to save, we passed the data we used props and emits.  </p>\n<pre><code class=\"language-javascript\">/* PARENT COMPONENT */\n// in template\n/* \n    &#x3C;app-edit-client-settings \n      @update:clientSettings=\"amendProxy\" \n      :proxy=\"localProxy\">\n    &#x3C;/app-edit-client-settings>\n    &#x3C;button @click=\"saveSettings\">Save Settings&#x3C;/button>\n*/\n\n// in script\nimport {fromJS} from 'immutable'; \nimport {mapActions, mapGetters} from 'vuex'\n\n// methods:\nexport default {\n  data(){\n    localProxy: {} \n    // this local proxy will be delivered as a synced prop to the child. \n    // when localProxy changes here, it will also change the prop value passed in. \n  },\n  computed: {\n    ...mapGetters(['currentClient'])\n  },\n  methods: {\n    ...mapActions(['saveClientSettings'])\n    onOpen() {\n      /* deepConvertToNormalObject is a function I wrote that\n      converts observables to non-observables. \n      We can now edit this.localProxy (and observe the changes *locally*) \n      to our hearts content without worrying about changing values in the store.\n      or triggering any methods that altering those values might have */\n      this.localProxy = deepConvertToNormalObject(this.currentClient); \n    },\n    /* this is essentially a callback.  \n    We pass it in to the child via the @update:clientSettings directive,\n    however, not via props.  \n    */\n    amendProxy({field, value}){\n      this.localProxy[field] = value; \n    },\n    saveSettings(){\n      const payload = deepConvertToNormalObject(this.localProxy);\n      this.saveClientSettings(payload)\n        .then(() => {\n          alert(\"Data saved!\")\n          this.localProxy = deepConvertToNormalObject(this.currentClient); \n          /* we want to resync the local proxy and the data in the store, which has come back from the API.  They *should* be the same, but when in doubt, the API has the single source of truth. */\n        })\n    }\n  }\n}\n\n/* CHILD COMPONENT */\n\n/* in template:\n    &#x3C;div class=\"settings__toggle\">\n      &#x3C;h5 class=\"settings__title\">Use Swifthire&#x3C;/h5>\n      &#x3C;md-switch md-align=\"end\"\n        :value=\"proxy.useSwifthire\"\n        @change=\"(val) => editProxy('useSwifthire', val)\"\n        class=\"md__blue settings__button\">\n      &#x3C;/md-switch>\n    &#x3C;/div>\n    &#x3C;div class=\"settings__toggle\">\n      &#x3C;h5 class=\"settings__title\">Auto-Provision New Users&#x3C;/h5>\n      &#x3C;md-switch md-align=\"end\"\n        :value=\"proxy.userAutoProvisioning\"\n        @change=\"(val) => editProxy('userAutoProvisioning', val)\"\n        class=\"md__blue settings__button\">\n      &#x3C;/md-switch>\n    &#x3C;/div>\n*/\n\nexport default {\n  props: {\n    proxy: {\n      type: Object,\n      required: true\n    }\n  }\n  methods: {\n    editProxy(field, value){\n      /* this.$emit is emitting a custom directive (in this case, \n      update:clientSettings.)\n      I.e, when the toggle switch changes, it triggers editProxy\n      as the @change event. This then emits the custom directive \n      back on the parent, passing in the correct parameters. */\n      this.$emit('update:clientSettings', {field, value})\n    }\n  }\n}\n</code></pre>\n<p>As I mentioned earlier, this is just one way to deal with this.  Vue also allows you to edit the proxy directly (usually a no-no) by declaring it as a <a href=\"https://medium.com/front-end-hacking/vues-v-model-directive-vs-sync-modifier-d1f83957c57c\">synced proxy</a>. </p>\n<p>The point is this - while there are many solutions, it's often best to find the simplest one and stick to it, allowing other developers to reason about your code.  </p>\n<h4>Use asynchronous actions to access the API.</h4>\n<p>While there are many ways to do this, (again), I reccomend using asynchronous actions in Vuex to handle <em>all</em> your API calls.  </p>\n<p>One of the problems that we had in the old code was that the functions that defined the API were tied to the Vue prototype, as this.$API -- essentially all the api calls were added to the Vue.prototype as Vue.prototype.$API (and accessed via Vue.$API); </p>\n<p>This allowed us to make ANY api call from inside ANY component at ANY time.</p>\n<p>But it also ended up getting a little confusing. Mostly because the API calls were invoked inside the methods of the components, and when their promises returned, only then were actions dispatched to change the vuex state.  This meant all the error handling had to be defined in all the places the api call was used.  </p>\n<p>Vuex actually makes asynchronous actions a breeze to work with, not requiring plugins like Redux-Thunk or Redux-Saga.  Additionally, Vuex does an <em>excellent</em> job of storing data that comes from the server so that it can be used in the application, partially because there is a step between dispatching an action and committing that change to the store.  This is very doable with Redux thunk, of course, but Vuex has this asynchronicity built in - why not use it? </p>\n<p>Essentially, it is the component which invokes the action, the action which makes the API call, and after the API call resolves or rejects, it is committed back into the store.  </p>\n<p>Not only does this seperate concerns out a bit more than putting the API functions on the prototype, but also allows you to more easily test component functionality with mocks. </p>\n<p>As a general rule, data that interacts with the API should be stored in the Vuex store. This is partially because API data is typically the kind of data used in multiple places in an application, but keeping all the API data in a single place will help you when tracking down where the data is made. </p>\n<p>While the store <em>might</em> contain information about the state of your front-end application, if you keep all your API calls in actions, and those actions then commit to the mutator, and thus to the state, you can ensure that A) all components are pulling from the single source of truth, and that no data will be duplicated, B) your front-end store will stay synced with your back-end data, C) your application will update automatically as soon as the API call resolves.  </p>\n<p>Old code:</p>\n<pre><code class=\"language-javascript\"> initDialog () {\n    this.$API.getClientCredentials(this.currentPartner.id, this.client.requestorId)\n      .then((credentials) => {\n        console.log({credentials})\n        this.$store.dispatch('reinitSettingsFlag', this.client)\n        this.$store.dispatch('initCredentials', [this.currentPartner.name.toLowerCase(), credentials])\n        this.$store.dispatch('setPrivateConfFields', credentials)\n      }, (err) => {\n        console.error('Error loading client settings data!', err)\n        // this.$store.dispatch('initCredentials', [this.currentPartner.name.toLowerCase(), credentials])\n      })\n  },\n</code></pre>\n<p>There's also another problem with this code - we do have access to mapGetters and mapActions, so I'm not entirely sure why the old programmer was using this.$store.dispatch... but you see what's happening. </p>\n<p>New Code: </p>\n<pre><code class=\"language-javascript\">// in component\n\nimport {mapActions, mapGetters} from 'vuex'; \n\nexport default () {\n  computed: {\n    ...mapGetters(['requestorId'])\n  }\n  methods: {\n    ...mapActions(['getClientCredentials']),\n    initDialog(){\n      this.getClientCredentials(this.requestorId)\n    }\n  }\n}\n\n// in modules. \n\nimport api from '../api' \nconst actions = {\n  getClientCredentials: ({ commit, getters }, requestorId) =>\n    new Promise((resolve, reject) =>\n      api()\n        .get.client.credentials({\n          // DYK? You can pass in \"getters\" to the first argument here, and get any getters defined in the store, meaning you don't have to pass around extra parameters if you don't need to. \n          integratedPartnerId: getters.currentPartnerId, \n          requestorId\n        })\n        .then(response => {\n          commit(types.ADD_CREDENTIALS_TO_CLIENT, response.data);\n          resolve(response.data);\n        })\n        .catch(err => {\n          console.error(\"err\", err);\n          reject(err);\n        })\n    ),\n}\n</code></pre>\n<p>Remember, while global variables are not cool, the whole purpose of having a state manager like Vuex is so that you can have access to all the information about the application's state at runtime.  There are advantages to a design that's more of a \"pure functional\" approach, where all the parameters are passed in and returned, but sometimes Object-oriented approaches are the way to go, especially if your application is all about maintaining state over time. </p>\n<h2>The Data Flow</h2>\n<p>What really threw us off when debugging was that the data in the application really didn't follow a strong \"flow\".  Actions could branch off and have invisible side effects, sometimes the actions would mutate the store data, other times the component data, other times, it would change the data in another component... it was just too hard to keep track of what was happening. </p>\n<p>This is one of the reasons that I'm glad I learned React/Redux (and specifically, the <em>flux pattern</em>), before taking on Vue.  So I created my own little guide to a user flow that allows you to better reason about how data is maintained in your application.  </p>\n<ul>\n<li>\n<p>STEP 1: EVENT</p>\n<p>The View (Vue) has an <em>event</em> happen (a button push, a listener trigger, a page load)</p>\n</li>\n<li>\n<p>STEP 2: DISPATCH AN ACTION</p>\n<p>The View then <em>dispatches an action</em> along with any data payload (such as the component data state). </p>\n</li>\n<li>\n<p>STEP 3: PROCESS THE DATA</p>\n<p>The action then processes the data from the event, and if necessary, grabs more data from the API.  All this data is put into a payload. </p>\n</li>\n<li>\n<p>STEP 4: COMMIT THE PAYLOAD(s)</p>\n<p>The callback to the commit in the Action (which can happen more than once, and can be asynchronous) commits those changes to the mutator. </p>\n</li>\n<li>\n<p>STEP 5: MUTATE THE STATE</p>\n<p>Based on the type put into the mutator, the state then gets mutated. </p>\n</li>\n<li>\n<p>STEP 6: OBSERVABLES CHANGE THE VALUE OF GETTERS</p>\n<p>Because the value of the state has changed, the value of the getters is now recalculated based on these new state values.  </p>\n</li>\n<li>\n<p>STEP 7: GETTERS GET COMPUTED INTO THE VIEW</p>\n<p>The getters, imported into the component, then change the view with the updated information.  This in turn MAY trigger another event, but it is more likely that user action will trigger the next event.  </p>\n</li>\n</ul>",frontmatter:{date:"03 December, 2017",path:"/blog/react-before-vue",title:"Why I'm glad I learned React before taking on Vue",tags:["react","vue","observables"],featuredImage:{publicURL:"/static/defaultImage-bf9d9895bd7ec25009144b0f166399c4.jpg",childImageSharp:{sizes:{srcSet:"/static/defaultImage-bf9d9895bd7ec25009144b0f166399c4-23bad.jpg 310w,\n/static/defaultImage-bf9d9895bd7ec25009144b0f166399c4-b3870.jpg 620w,\n/static/defaultImage-bf9d9895bd7ec25009144b0f166399c4-f0cf2.jpg 950w"}}}}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-react-before-vue-70bcb232c6f958f73a7a.js.map