<template>
  <div>
    <el-card style="height: 80px">
      <el-form :inline="true" class="form">
        <el-form-item label="角色名称">
          <el-input
            v-model="searchRole"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="!searchRole" @click="search">
            搜索
          </el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" icon="Plus" @click="addRole">
        添加角色
      </el-button>
      <el-table border style="margin: 10px 0" :data="allRoleList">
        <el-table-column
          type="index"
          label="#"
          align="center"
        ></el-table-column>
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称"
          align="center"
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
        <el-table-column label="操作" width="350" align="center">
          <template #default="{ row }">
            <el-button type="primary" icon="User" @click="setPermission(row)">
              分配权限
            </el-button>
            <el-button type="primary" icon="Edit" @click="updateRole(row)">
              编辑
            </el-button>
            <el-popconfirm
              :title="`确定删除${row.roleName}?`"
              @confirm="delRole(row)"
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
        @current-change="getAllRole"
        @size-change="getAllRole"
      />
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      :title="roleParams.id ? '修改角色' : '添加角色'"
    >
      <el-form :model="roleParams" :rules="rules" ref="refForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            v-model="roleParams.roleName"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </template>
    </el-dialog>
    <el-drawer v-model="drawer" title="分配权限">
      <template #default>
        <el-tree
          ref="tree"
          :data="permissionList"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="checkedPermission"
          :props="defaultProps"
        />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer = false">取消</el-button>
          <el-button type="primary" @click="handleSetPermission">
            确定
          </el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {
  fetchAllRole,
  fetchAddOrUpdateRole,
  fetchAllPermissionList,
  fetchSetPermission,
  fetchDeleteRole,
} from '@/api/acl/role';
import { Permission, Role, RoleResponseData } from '@/api/acl/role/type';
import useLayoutStore from '@/store/modules/setting';
import { ElMessage } from 'element-plus';
import { nextTick, onMounted, reactive, ref } from 'vue';

const pageNow = ref<number>(1);
const limit = ref<number>(10);
const total = ref<number>(0);
const allRoleList = ref<RoleResponseData['data']['records']>([]);
const searchRole = ref<string>('');
const dialogVisible = ref<boolean>(false);
const roleParams = reactive<Role>({
  roleName: '',
});
const refForm = ref<any>();
const drawer = ref<boolean>(false);
const permissionList = ref<Permission[]>([]);
const checkedPermission = ref<number[]>([]);
const tree = ref<any>();

const settingStore = useLayoutStore();

const defaultProps = {
  children: 'children',
  label: 'name',
};

onMounted(() => {
  getAllRole();
});

const getAllRole = async () => {
  const res = await fetchAllRole(pageNow.value, limit.value, searchRole.value);
  if (res.code === 200) {
    total.value = res.data.total;
    allRoleList.value = res.data.records;
  }
};

const search = async () => {
  getAllRole();
  searchRole.value = '';
};

const reset = async () => {
  settingStore.refresh = !settingStore.refresh;
};

const addRole = () => {
  dialogVisible.value = true;
  Object.assign(roleParams, {
    id: '',
    roleName: '',
  });
  nextTick(() => {
    refForm.value.resetFields();
  });
};

const updateRole = (row: Role) => {
  Object.assign(roleParams, row);
  dialogVisible.value = true;
  nextTick(() => {
    refForm.value.clearValidate();
  });
};

const rules = {
  roleName: [
    {
      required: true,
      validator: (_: any, value: any, callback: any) => {
        if (!value) {
          return callback(new Error('请输入角色名称'));
        }
        if (value.length < 2 || value.length > 16) {
          return callback(new Error('角色名称长度至少2位'));
        }
        callback();
      },
      trigger: 'change',
    },
  ],
};

const save = async () => {
  await refForm.value.validate();
  const res = await fetchAddOrUpdateRole(roleParams);
  if (res.code === 200) {
    dialogVisible.value = false;
    ElMessage({
      type: 'success',
      message: roleParams.id ? '修改用户成功' : '添加用户成功',
    });
    getAllRole();
  } else {
    ElMessage({
      type: 'error',
      message: roleParams.id ? '修改用户失败' : '添加用户失败',
    });
  }
};

const filterPermissionList = (data: Permission[]) => {
  data.forEach((item: Permission) => {
    if (item.select && item.level === 4) {
      checkedPermission.value.push(item.id as number);
    }
    if (item.children && item.children.length > 0) {
      filterPermissionList(item.children);
    }
  });
};

const setPermission = async (row: Role) => {
  drawer.value = true;
  Object.assign(roleParams, row);
  const res = await fetchAllPermissionList(row.id as number);
  if (res.code === 200) {
    permissionList.value = res.data;
    filterPermissionList(res.data);
  }
};

const handleSetPermission = async () => {
  const permissionIdArr = tree.value
    .getCheckedKeys()
    .concat(tree.value.getHalfCheckedKeys());
  const res = await fetchSetPermission(
    roleParams.id as number,
    permissionIdArr,
  );
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '分配权限成功',
    });
    drawer.value = false;
    window.location.reload();
  } else {
    ElMessage({
      type: 'error',
      message: '分配权限失败',
    });
  }
};

const delRole = async (row: Role) => {
  const res = await fetchDeleteRole(row.id as number);
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除角色成功',
    });
    getAllRole();
  } else {
    ElMessage({
      type: 'error',
      message: '删除角色失败',
    });
  }
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
