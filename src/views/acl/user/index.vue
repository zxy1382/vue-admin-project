<template>
  <div>
    <el-card style="height: 80px">
      <el-form :inline="true" class="form">
        <el-form-item label="用户名">
          <el-input v-model="searchUser" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="!searchUser" @click="search">
            搜索
          </el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button
        type="danger"
        :disabled="!selectedUser.length"
        @click="delUsers"
      >
        批量删除
      </el-button>
      <el-table
        border
        style="margin: 10px 0"
        :data="allUserList"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column
          type="index"
          label="#"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column
          prop="username"
          label="用户名字"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="用户名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="roleName"
          label="用户角色"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="350px" align="center">
          <template #default="{ row }">
            <el-button type="primary" icon="User" @click="setRole(row)">
              分配角色
            </el-button>
            <el-button type="success" icon="Edit" @click="updateUser(row)">
              编辑
            </el-button>
            <el-popconfirm
              :title="`确定删除${row.userName}?`"
              @confirm="delUser(row)"
              width="200"
              placement="top"
            >
              <template #reference>
                <el-button type="danger" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 10px"
        v-model:current-page="pageNow"
        v-model:page-size="limit"
        :page-sizes="[10, 15, 20, 30, 50, 100]"
        background
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @current-change="getAllUser"
        @size-change="getAllUser"
      />
    </el-card>
    <el-drawer
      v-model="drawer"
      :title="userParams.id ? '修改用户' : '添加用户'"
    >
      <template #default>
        <el-form :model="userParams" :rules="rules" ref="refForm">
          <el-form-item label="用户姓名" prop="username">
            <el-input
              v-model="userParams.username"
              placeholder="请输入用户姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="name">
            <el-input
              v-model="userParams.name"
              placeholder="请输入用户昵称"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="!userParams.id" label="用户密码" prop="password">
            <el-input
              v-model="userParams.password"
              placeholder="请输入用户密码"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </div>
      </template>
    </el-drawer>
    <el-drawer v-model="drawer1" title="分配角色">
      <template #default>
        <el-form :model="userParams" :rules="rules" ref="refForm">
          <el-form-item label="用户姓名" prop="username">
            <el-input
              v-model="userParams.username"
              placeholder="请输入用户姓名"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色列表" prop="name">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <el-checkbox-group
              v-model="assignRoles"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                v-for="item in allRolesList"
                :key="item.id"
                :label="item"
              >
                {{ item.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="saveSetRole">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {
  fetchAddOrUpdateUser,
  fetchAllRole,
  fetchAllUser,
  fetchDeleteUser,
  fetchSetRole,
  fetchDeleteUsers,
} from '@/api/acl/user';
import {
  RoleResponseData,
  SetRoleData,
  User,
  UserResponseData,
} from '@/api/acl/user/type';
import useLayoutStore from '@/store/modules/setting';
import { ElMessage } from 'element-plus';
import { nextTick, onMounted, reactive, ref } from 'vue';

const pageNow = ref<number>(1);
const limit = ref<number>(10);
const total = ref<number>(0);
const allUserList = ref<UserResponseData['data']['records']>([]);
const drawer = ref<boolean>(false);
const drawer1 = ref<boolean>(false);
const userParams = reactive<User>({
  username: '',
  name: '',
  password: '',
});
const refForm = ref<any>();
const checkAll = ref<boolean>(false);
const isIndeterminate = ref<boolean>(true);
const assignRoles = ref<RoleResponseData['data']['assignRoles']>([]);
const allRolesList = ref<RoleResponseData['data']['allRolesList']>([]);
const selectedUser = ref<User[]>([]);
const searchUser = ref<string>('');

const settingStore = useLayoutStore();

onMounted(() => {
  getAllUser();
});

const getAllUser = async () => {
  const res: UserResponseData = await fetchAllUser(
    pageNow.value,
    limit.value,
    searchUser.value,
  );
  if (res.code === 200) {
    total.value = res.data.total;
    allUserList.value = res.data.records;
  }
};

const addUser = () => {
  Object.assign(userParams, {
    id: 0,
    username: '',
    name: '',
    password: '',
  });
  drawer.value = true;
  nextTick(() => {
    refForm.value.resetFields();
  });
};

const updateUser = (row: User) => {
  Object.assign(userParams, row);
  drawer.value = true;
  nextTick(() => {
    refForm.value.clearValidate();
  });
};

const save = async () => {
  await refForm.value.validate();
  const res = await fetchAddOrUpdateUser(userParams);
  if (res.code === 200) {
    drawer.value = false;
    ElMessage({
      type: 'success',
      message: userParams.id ? '修改用户成功' : '添加用户成功',
    });
    getAllUser();
    //浏览器自动刷新
    window.location.reload();
  } else {
    ElMessage({
      type: 'error',
      message: userParams.id ? '修改用户失败' : '添加用户失败',
    });
  }
};

const cancel = () => {
  drawer.value = false;
};

const rules = {
  username: [
    {
      required: true,
      trigger: 'change',
      validator: (_: any, value: any, callback: any) => {
        if (!value) {
          return callback(new Error('请输入用户名'));
        }
        if (value.length < 2 || value.length > 16) {
          return callback(new Error('用户名字长度为2-16位'));
        }
        callback();
      },
    },
  ],
  name: [
    {
      required: true,
      trigger: 'change',
      validator: (_: any, value: any, callback: any) => {
        if (!value) {
          return callback(new Error('请输入用户昵称'));
        }
        if (value.length < 2 || value.length > 16) {
          return callback(new Error('用户昵称长度为2-16位'));
        }
        callback();
      },
    },
  ],
  password: [
    {
      required: true,
      trigger: 'change',
      validator: (_: any, value: any, callback: any) => {
        if (!value) {
          return callback(new Error('请输入密码'));
        }
        if (value.length < 6) {
          return callback(new Error('密码长度至少为6位'));
        }
        callback();
      },
    },
  ],
};

//分配角色
const setRole = async (row: User) => {
  drawer1.value = true;
  Object.assign(userParams, row);
  const res: RoleResponseData = await fetchAllRole(row.id as number);
  if (res.code === 200) {
    allRolesList.value = res.data.allRolesList;
    assignRoles.value = res.data.assignRoles;
  }
};

const handleCheckAllChange = (val: boolean) => {
  assignRoles.value = val ? allRolesList.value : [];
  isIndeterminate.value = false;
};

const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === allRolesList.value.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRolesList.value.length;
};

const saveSetRole = async () => {
  const data: SetRoleData = {
    userId: userParams.id as number,
    roleIdList: assignRoles.value.map((item) => item.id as number),
  };
  const res = await fetchSetRole(data);
  if (res.code === 200) {
    drawer1.value = false;
    ElMessage({
      type: 'success',
      message: '分配角色成功',
    });
    getAllUser();
  } else {
    ElMessage({
      type: 'error',
      message: '分配角色失败',
    });
  }
};

//删除单个用户
const delUser = async (row: User) => {
  const res = await fetchDeleteUser(row.id as number);
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除用户成功',
    });
    getAllUser();
  } else {
    ElMessage({
      type: 'error',
      message: '删除用户失败',
    });
  }
};

const selectChange = (val: any) => {
  selectedUser.value = val;
};

const delUsers = async () => {
  const idList = selectedUser.value.map((item) => item.id);
  const res = await fetchDeleteUsers(idList as number[]);
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '批量删除用户成功',
    });
    getAllUser();
  } else {
    ElMessage({
      type: 'error',
      message: '批量删除用户失败',
    });
  }
};

const search = async () => {
  getAllUser();
  searchUser.value = '';
};

const reset = async () => {
  settingStore.refresh = !settingStore.refresh;
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
