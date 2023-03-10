import { ref, reactive } from "vue";

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
