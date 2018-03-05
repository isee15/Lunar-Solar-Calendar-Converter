# -*- coding: utf-8 -*-
__author__ = 'isee15'

# sudo python setup.py register sdist bdist_egg upload

from setuptools import setup

"""
打包的用的setup必须引入
"""

VERSION = '1.1.0'

with open('README.rst') as f:
    long_description = f.read()

setup(
    name='LunarSolarConverter',  # 文件名
    version=VERSION,  # 版本(每次更新上传Pypi需要修改)
    description="a lunar-solar converter",
    long_description=long_description,  # 放README.md文件,方便在Pypi页展示
    classifiers=[],  # Get strings from http://pypi.python.org/pypi?%3Aaction=list_classifiers
    keywords='python lunar solar converter',  # 关键字
    author='isee15',  # 用户名
    author_email='isee15@outlook.com',  # 邮箱
    url='https://github.com/isee15/Lunar-Solar-Calendar-Converter',  # github上的地址,别的地址也可以
    license='MIT',  # 遵循的协议
    packages=['LunarSolarConverter'],  # 发布的包名
    include_package_data=True,
    zip_safe=True,
    install_requires=[
    ],  # 满足的依赖
    entry_points={
        'console_scripts': [
            'LunarSolarConverter = LunarSolarConverter:main'
        ]
    },
)
