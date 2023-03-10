export const codeConfig=[
    {key:'index.vue',caption:'index.vue',content:`<script setup lang="ts">
    import { ref, } from 'vue'
    import { tableValue, tableConfig1 } from './data1.ts'
    
    import { useMyTable } from './tableTranlator.ts'
    import {configTableSimple} from './data2.ts'
    
    
    import {codeConfig} from './code.ts'
    import  CodeView from '@/components/CodeView/index.vue'
    //
    
    const tableConfig2 = useMyTable(tableValue, configTableSimple)
    //
    function clearData(){
      tableValue.value=[]
    }
    //
    const mainRef1=ref(null)
    //
    function clearSelection(){
      mainRef1.value.callMethod('clearSelection')
    }
    </script>
    
    <template>
      <div style="margin:10px;">
    
        <h3>Table can be considered as a container: One el-table with multiple el-table-column.</h3>
        {{ tableValue }}<br>
        <el-button type="danger" @click="clearData">Clear data to see the content of empty slot</el-button>
        <h3>Here a simple sample to call method to clear selection. A more complex method call solution is under development.</h3>
        <el-button type="primary" @click="clearSelection">Clear selection</el-button><br><br>
        <CompWrap ref="mainRef1" :config="tableConfig1"></CompWrap>
        <el-divider></el-divider>
        <h3>If look into the configuration, it is powerful and flexible,but it look quite complex.<br />
        We could simplify the table configuration with customized configuration format ,
        and then write a piece of code to translate to the standard format as the config in the above sample.<br>
        How to simplfy the config depends on the requrirement, here is just a sample, you can define your own config file and translate code.<br>
        Normally in a real project multiple config can be defined for different use cases.<br>
        </h3>
        
        <el-divider></el-divider>
        <CompWrap ref="mainRef2" :config="tableConfig2"></CompWrap>
        <el-divider></el-divider>
        <CodeView :config="codeConfig"></CodeView>
      </div>
    </template>
    <style>
    
    </style>`},
    {key:'data1.ts',caption:'data1.ts',content:`import { ref, reactive } from "vue";

    export const tableValue = ref([
      {
        date: "2016-05-03",
        name: "Tom",
        address: "Address 111",
      },
      {
        date: "2016-05-02",
        name: "Jack",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-04",
        name: "Who",
        address: "Who is here 3",
      },
      {
        date: "2016-05-01",
        name: "Yoyo",
        address: "Do not know 4",
      },
    ]);
    
    //Just for demo purpose
    function formatBirthday(context,d) {
      if (d.slotValue?.row?.date) {
        return d.slotValue.row.date.replaceAll("-", "/");
      }
      return "No data";
    }
    
    export const tableConfig1 = reactive({
      sys: {
        component: "el-table",
      },
      props: {
        stripe: true,
        border: true,
        showHeade: true,
        //
        data: tableValue,
      },
      slots: {
        empty: { type: "html", value: "<b>Hello world</b>,there is no data!" },
        default: {
          type: "wrap",
          value: [
            {
              sys: {
                component: "el-table-column",
              },
              props: {
                type: "selection",
              },
            },
            {
              sys: {
                component: "el-table-column",
              },
              props: {
                type: "index",
                label: "#",
              },
            },
            {
              sys: {
                component: "el-table-column",
              },
              props: {
                prop: "date",
                sortable: true,
                width: "200px",
              },
              slots: {
                //Use a funciton to genreate output
                default: { type: "function", value: formatBirthday },
                //Change caption
                header: { type: "html", value: "Customer <b>birthday</b>" },
              },
            },
            {
              sys: {
                component: "el-table-column",
              },
              props: {
                prop: "name",
                label: "Name",
                width: "300px",
              },
              slots: {
                //Please note it is a function to get value from parameter sp
                default: {
                  type: "wrap",
                  value: function (sp) {
                    return {
                      //Use element tag to display name
                      sys: {
                        component: "el-tag",
                      },
                      props: {
                        type: "success",
                        effect: "dark",
                      },
                      slots: {
                        default: sp.slotValue.row.name,
                      },
                      events: {},
                    };
                  },
                },
              },
            },
            {
              sys: {
                component: "el-table-column",
              },
              props: {
                //???????????????,???????????????????????????,????????????_?????????????????????Form Item???
                prop: "address",
                label: "Address",
                width: "auto",
                //_??????????????????????????????,????????????????????????,???????????????????????????
              },
              slots: {
                //empty:{type:'component',value:Search},
                default: function (context,sp) {
                  let address = sp.slotValue.row.address;
                  //This the HTML of el-tag
                  return (
                    '<span class="el-tag el-tag--success el-tag--dark">' +
                    '<span class="el-tag__content">' +
                    address +
                    "</span>" +
                    "</span>"
                  );
                },
              },
            },
          ],
        },
      },
      events: {},
    });        
    `},
    {key:'data2.ts',caption:'data2.ts',content:`export const configTableSimple = {
      columns: [
        {
          type: "selection",
        },
        {
          type: "index",
          label: "#",
        },
        {
          prop: "date",
          label: "Date",
          sortable: true,
          width: "200px",
        },
        {
          prop: "name",
          label: "Name",
          width: "300px",
          _formatter: elTagFormatter('primay','name'),
        },
        {
          prop: "address",
          label: "Address",
          _formatter: elTagFormatter('success','address'),
        },
      ],
    };
    
    function elTagFormatter(type, key) {
      return function (context,sp) {
        let address = sp.slotValue.row[key];
        //This the HTML of el-tag
        return (
          '<span class="el-tag el-tag--'+type+' el-tag--dark">' +
          '<span class="el-tag__content">' +
          address +
          "</span>" +
          "</span>"
        );
      };
    }
    
    `},
  ]