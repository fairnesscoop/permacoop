venv = ./venv
bin = ${venv}/bin/

export ANSIBLE_CONFIG = ansible/ansible.cfg

install:
	python3 -m venv ${venv}
	${bin}pip install -U pip setuptools wheel
	${bin}pip install -r requirements.txt
	@echo $(${bin}ansible --version)

provision:
	${bin}ansible-playbook -i ansible/hosts -t provision ansible/playbook.yml

deploy:
	${bin}ansible-playbook -i ansible/hosts -t deploy ansible/playbook.yml
